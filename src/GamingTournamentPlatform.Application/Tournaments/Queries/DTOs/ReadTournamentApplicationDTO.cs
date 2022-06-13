using GamingTournamentPlatform.Application.Tournaments.Queries.Read;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.DTOs
{
    public class ReadTournamentApplicationDTO
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public bool Inventation { get; set; }

        public int? UserId { get; set; }
        public int? TeamId { get; set; }

        public ReadTournamentDTO? Tournament { get; set; }
    }
}
