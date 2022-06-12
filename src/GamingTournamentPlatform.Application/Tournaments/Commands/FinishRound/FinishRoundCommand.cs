using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.FinishRound
{
    public class FinishRoundCommand : IRequest
    {
        public int TournamentId { get; set; }
        public int RoundId { get; set; }
        public bool FirstParticipantWon { get; set; }
    }
}
