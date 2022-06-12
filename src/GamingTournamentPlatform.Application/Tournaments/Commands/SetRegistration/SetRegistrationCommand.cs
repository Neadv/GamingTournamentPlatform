using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.SetRegistration
{
    [Authorize]
    public class SetRegistrationCommand : IRequest
    {
        public int Id { get; set; }
    }
}
