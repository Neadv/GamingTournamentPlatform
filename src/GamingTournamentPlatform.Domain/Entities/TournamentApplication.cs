namespace GamingTournamentPlatform.Domain.Entities
{
    public class TournamentApplication
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public bool Inventation { get; set; }

        public int RegistrationInfoId { get; set; }
        public virtual TournamentRegistrationInfo? RegistrationInfo { get; set; }

        public int? UserId { get; set; }
        public virtual User? User { get; set; }

        public int? TeamId { get; set; }
        public virtual Team? Team { get; set; }
    }
}
