using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Queries.ReadApplication
{
    [Authorize]
    public class ReadApplicationQuery : IRequest<IEnumerable<ReadTeamApplicationDTO>>
    {
        public int TeamId { get; set; }
    }
}
