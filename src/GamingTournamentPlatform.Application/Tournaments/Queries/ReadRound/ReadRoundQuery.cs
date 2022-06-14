using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.ReadRound
{
    [Authorize]
    public class ReadRoundQuery : IRequest<ReadTournamentRoundDTO>
    {
        public int TournamentId { get; set; }
        public int RoundId { get; set; }
    }
}
