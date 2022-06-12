using GamingTournamentPlatform.Domain.Common;
using GamingTournamentPlatform.Domain.Enums;

namespace GamingTournamentPlatform.Domain.Entities
{
    public class Tournament : AuditableEntity
    {
        public int Id { get; set; }
        public TournamentState State { get; set; }
        public TournamentType Type { get; set; }
        public bool IsPublic { get; set; } = true;

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public int OrganizerId { get; set; }
        public virtual User? Organizer { get; set; }

        public int CategoryId { get; set; }
        public virtual TournamentCategory? Category { get; set; }

        public virtual TournamentRegistrationInfo? RegistrationInfo { get; set; }

        public bool IsTeamTournament => Category?.AllowCreatingTeams ?? false;

        public virtual ICollection<TournamentStage> Stages { get; set; } = new HashSet<TournamentStage>();

        public virtual ICollection<Team> TeamParticipants { get; set; } = new HashSet<Team>();
        public virtual ICollection<User> UserParticipants { get; set; } = new HashSet<User>();

        public Tournament(string title, string description)
        {
            Title = title;
            Description = description;
        }

        protected Tournament() { }
    }
}
