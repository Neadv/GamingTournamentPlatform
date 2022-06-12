using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.FinishRegistration
{
    [Authorize]
    public class FinishRegistrationCommand : IRequest
    {
        public int Id { get; set; }
    }
}
