using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Start
{
    [Authorize]
    public class StartTournamentCommand : IRequest
    {
        public int Id { get; set; }
    }
}
