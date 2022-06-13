using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.Applications
{
    [Authorize]
    public class ApplicationsQuery : IRequest<IEnumerable<TournamentApplicationDTO>>
    {
        public int TournamentId { get; set; }
    }
}
