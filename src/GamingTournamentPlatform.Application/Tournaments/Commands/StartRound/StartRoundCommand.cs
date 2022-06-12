using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.StartRound
{
    public class StartRoundCommand : IRequest
    {
        public int TournamentId { get; set; }
        public int RoundId { get; set; }
    }
}
