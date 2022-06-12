
namespace GamingTournamentPlatform.Domain.Entities
{
    public class TournamentUserRound : TournamentRoundBase
    {
        public int? FirstParticipantId { get; set; }
        public virtual User? FirstParticipant { get; set; }

        public int? SecondParticipantId { get; set; }
        public virtual User? SecondParticipant { get; set; }

        public int? NextRoundId { get; set; }
        public TournamentUserRound? NextRound { get; set; }
    }
}