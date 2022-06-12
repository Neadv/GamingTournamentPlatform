using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.SetRegistration
{
    public class SetRegistrationCommandHandler : IRequestHandler<SetRegistrationCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public SetRegistrationCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(SetRegistrationCommand request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.FindAsync(request.Id);
            if (tournament == null)
                throw new NotFoundException();

            if (tournament.State != Domain.Enums.TournamentState.New)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["State"] = new string[] { "Editing is available only for tournaments with state: 'new'" }
                });
            }

            if (tournament.OrganizerId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Organizer"] = new string[] { "Only organizer can edit tournament" }
                });
            }

            tournament.State = Domain.Enums.TournamentState.Registration;

            _context.Tournaments.Update(tournament);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
