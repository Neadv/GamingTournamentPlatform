using GamingTournamentPlatform.Application.Teams.Queries;
using GamingTournamentPlatform.Application.Users.Queries;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.Applications
{
    public class TournamentApplicationDTO
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public bool Inventation { get; set; }

        public int? UserId { get; set; }
        public ReadUserDTO? User { get; set; }

        public int? TeamId { get; set; }
        public ReadTeamDTO? Team { get; set; }
    }
}
