namespace GamingTournamentPlatform.Domain.Entities
{
    public class TournamentTeamRound : TournamentRoundBase
    {
        public int? FirstParticipantId { get; set; }
        public virtual Team? FirstParticipant { get; set; }

        public int? SecondParticipantId { get; set; }
        public virtual Team? SecondParticipant { get; set; }

        public int? NextRoundId { get; set; }
        public TournamentTeamRound? NextRound { get; set; }
    }
}