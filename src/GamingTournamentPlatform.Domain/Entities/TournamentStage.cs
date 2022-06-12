using GamingTournamentPlatform.Domain.Common;
using GamingTournamentPlatform.Domain.Enums;

namespace GamingTournamentPlatform.Domain.Entities
{
    public class TournamentStage : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public int TournamentId { get; set; }
        public virtual Tournament? Tournament { get; set; }

        public TournamentStageState State { get; set; }

        public virtual ICollection<TournamentTeamRound> TournamentTeamRounds { get; set; } = new List<TournamentTeamRound>();   
        public virtual ICollection<TournamentUserRound> TournamentUserRounds { get; set; } = new List<TournamentUserRound>();
    }
}
