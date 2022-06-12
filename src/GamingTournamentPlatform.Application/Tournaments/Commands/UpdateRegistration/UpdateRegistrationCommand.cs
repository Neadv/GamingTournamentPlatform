using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.UpdateRegistration
{
    [Authorize]
    public class UpdateRegistrationCommand : IRequest
    {
        public int TournamentId { get; set; }
        public DateTime RegistrationDeadline { get; set; }
        public int CountOfParticipants { get; set; }
    }
}
