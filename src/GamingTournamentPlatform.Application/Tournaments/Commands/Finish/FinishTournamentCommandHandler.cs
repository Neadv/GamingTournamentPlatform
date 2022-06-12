using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Finish
{
    public class FinishTournamentCommandHandler : IRequestHandler<FinishTournamentCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public FinishTournamentCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(FinishTournamentCommand request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.FirstOrDefaultAsync(t => t.Id == request.Id);
            if (tournament == null)
                throw new NotFoundException();

            if (tournament.OrganizerId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Organizer"] = new string[] { "Only organizer can edit tournament" }
                });
            }

            if (tournament.State != Domain.Enums.TournamentState.InProgress)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["State"] = new string[] { "Editing is available only for tournaments with state: 'in progress'" }
                });
            }

            tournament.State = Domain.Enums.TournamentState.Finished;

            _context.Tournaments.Update(tournament);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
