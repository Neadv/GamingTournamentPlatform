using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Finish
{
    [Authorize]
    public class FinishTournamentCommand : IRequest
    {
        public int Id { get; set; }
    }
}
