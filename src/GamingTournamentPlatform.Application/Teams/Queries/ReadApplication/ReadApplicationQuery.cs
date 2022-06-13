using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Queries.ReadApplication
{
    [Authorize]
    public class ReadApplicationQuery : IRequest<IEnumerable<ReadApplicationDTO>>
    {
        public int TeamId { get; set; }
    }
}
