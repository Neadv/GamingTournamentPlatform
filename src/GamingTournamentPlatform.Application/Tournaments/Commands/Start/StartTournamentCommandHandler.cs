using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Start
{
    public class StartTournamentCommandHandler : IRequestHandler<StartTournamentCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public StartTournamentCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(StartTournamentCommand request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.Include(t => t.Stages).FirstOrDefaultAsync(t => t.Id == request.Id);
            if (tournament == null)
                throw new NotFoundException();

            if (tournament.OrganizerId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Organizer"] = new string[] { "Only organizer can edit tournament" }
                });
            }

            if (tournament.State != Domain.Enums.TournamentState.NotStarted)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["State"] = new string[] { "Editing is available only for tournaments with state: 'not started'" }
                });
            }

            if (tournament.Stages.Count == 0)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Stages"] = new string[] { "Invalid stages count" }
                });
            }

            tournament.State = Domain.Enums.TournamentState.InProgress;

            _context.Tournaments.Update(tournament);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
