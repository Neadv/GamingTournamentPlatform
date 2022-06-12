namespace GamingTournamentPlatform.Domain.Entities
{
    public class TournamentRegistrationInfo
    {
        public int Id { get; set; }

        public int TournamentId { get; set; }
        public virtual Tournament? Tournament { get; set; }

        public DateTime RegistrationDeadline { get; set; }
        public int CountOfParticipants { get; set; }

        public virtual ICollection<TournamentApplication> TournamentApplications { get; set; } = new List<TournamentApplication>();
    }
}