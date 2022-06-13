using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.UpdateRegistration
{
    public class UpdateRegistrationCommandHandler : IRequestHandler<UpdateRegistrationCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public UpdateRegistrationCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(UpdateRegistrationCommand request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.Include(t => t.RegistrationInfo).FirstOrDefaultAsync(t => t.Id == request.TournamentId);
            if (tournament == null)
                throw new NotFoundException();

            if (tournament.OrganizerId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Organizer"] = new string[] { "Only organizer can edit tournament" }
                });
            }

            if (tournament.State != Domain.Enums.TournamentState.New && tournament.State != Domain.Enums.TournamentState.Registration)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["State"] = new string[] { "Editing is available only for tournaments with state: 'new' or 'registration'" }
                });
            }

            if (tournament.RegistrationInfo != null)
            {
                tournament.RegistrationInfo.CountOfParticipants = request.CountOfParticipants;
                tournament.RegistrationInfo.RegistrationDeadline = request.RegistrationDeadline;
            }
            else
            {
                tournament.RegistrationInfo = new Domain.Entities.TournamentRegistrationInfo
                {
                    RegistrationDeadline = request.RegistrationDeadline,
                    CountOfParticipants = request.CountOfParticipants
                };
            }

            _context.Tournaments.Update(tournament);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
