namespace GamingTournamentPlatform.Domain.Entities
{
    public class TeamUserApplication
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public bool Inventation { get; set; }

        public int UserId { get; set; }
        public virtual User? User { get; set; }

        public int TeamId { get; set; }
        public virtual Team? Team { get; set; }

        public TeamUserApplication(User user, Team team, string message, bool inventation)
        {
            User = user;
            Team = team;
            Message = message;
            Inventation = inventation;
        }

        protected TeamUserApplication() { }
    }
}
