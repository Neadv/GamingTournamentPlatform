using GamingTournamentPlatform.Application.Common.Security;
using GamingTournamentPlatform.Application.Tournaments.Queries.DTOs;

using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Queries.TournamentApplication
{
    [Authorize]
    public class TournamentApplicationQuery : IRequest<IEnumerable<ReadTournamentApplicationDTO>>
    {
        public int TeamId { get; set; }
    }
}
