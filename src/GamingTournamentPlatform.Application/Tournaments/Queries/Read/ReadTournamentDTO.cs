using GamingTournamentPlatform.Application.Categories.Queries;
using GamingTournamentPlatform.Application.Users.Queries;
using GamingTournamentPlatform.Domain.Enums;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.Read
{
    public class ReadTournamentDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;

        public TournamentState State { get; set; }
        public TournamentType Type { get; set; }
        public bool IsPublic { get; set; } = true;

        public int OrganizerId { get; set; }
        public ReadUserDTO? Organizer { get; set; }

        public int CategoryId { get; set; }
        public ReadCategoryDTO? Category { get; set; }

        public DateTime RegistrationDeadline { get; set; }
    }
}
