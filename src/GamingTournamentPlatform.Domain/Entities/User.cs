namespace GamingTournamentPlatform.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public virtual IList<Team> LeaderTeams { get; set; } = new List<Team>();
        public virtual IList<Team> Teams { get; set; } = new List<Team>();
        public virtual IList<TeamUserApplication> TeamApplications { get; set; } = new List<TeamUserApplication>();
        public virtual IList<TournamentApplication> TournamentApplications { get; set; } = new List<TournamentApplication>();
        public virtual IList<Tournament> Tournaments { get; set; } = new List<Tournament>();


        public User(string username, string email)
        {
            UserName = username;
            Email = email;
        }

        protected User() { }

        public bool AddToTeam(Team team)
        {
            if (Teams.Any(t => t.Id == team.Id || t.CategoryId == team.CategoryId))
            {
                return false;
            }

            Teams.Add(team);
            team.Participants.Add(this);

            return true;
        }
    }
}
