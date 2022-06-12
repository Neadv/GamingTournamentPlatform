namespace GamingTournamentPlatform.Domain.Entities
{
    public class TournamentCategory
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool AllowCreatingTeams { get; set; } = false;
        public bool AllowOrganizeCompetitions { get; set; } = true;

        public int? ParentId { get; set; }
        public virtual TournamentCategory? Parent { get; set; }

        public virtual IList<TournamentCategory> Children { get; set; } = new List<TournamentCategory>();

        public virtual ICollection<Team> Teams { get; set; } = new HashSet<Team>();

        public TournamentCategory(string name, string description)
        {
            Name = name;
            Description = description;
        }

        protected TournamentCategory() { }

        public void AddChild(TournamentCategory child)
        {
            child.Parent = this;
            child.ParentId = ParentId;

            Children.Add(child);
        }
    }
}
