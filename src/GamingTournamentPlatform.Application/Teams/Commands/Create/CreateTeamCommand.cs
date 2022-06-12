using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Commands.Create
{
    [Authorize]
    public class CreateTeamCommand : IRequest<int>
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public int CategoryId { get; set; }
    }
}
