namespace GamingTournamentPlatform.Application.Categories.Queries
{
    public class ReadCategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public bool AllowCreatingTeams { get; set; }
        public bool AllowOrganizeCompetitions { get; set; }
        public int? ParentId { get; set; }

        public IEnumerable<ReadCategoryDTO> Children { get; set; } = new List<ReadCategoryDTO>();
    }
}
