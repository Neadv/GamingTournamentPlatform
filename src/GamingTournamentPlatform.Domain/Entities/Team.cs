using GamingTournamentPlatform.Domain.Common;

namespace GamingTournamentPlatform.Domain.Entities
{
    public class Team : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public int CategoryId { get; set; }
        public virtual TournamentCategory? Category { get; set; }

        public int LeaderId { get; set; }
        public virtual User? Leader { get; set; }

        public virtual IList<User> Participants { get; set; } = new List<User>();

        public virtual IList<TeamUserApplication> Applications { get; set; } = new List<TeamUserApplication>();

        public Team(string name, string description, TournamentCategory category)
        {
            Name = name;
            Description = description;

            if (!category.AllowCreatingTeams)
                throw new InvalidOperationException(nameof(category.AllowCreatingTeams)); // TODO: Add domain exceptions

            Category = category;
            CategoryId = category.Id;
        }

        protected Team() { }

        public bool AddParticipant(User user)
        {
            if (user.Teams.Any(t => t.Id == Id || t.CategoryId == CategoryId))
            {
                return false;
            }

            Participants.Add(user);
            user.Teams.Add(this);

            return true;
        }

        public void AddLeader(User user)
        {
            Leader = user;
            LeaderId = user.Id;
            user.LeaderTeams.Add(this);
        }
    }
}
