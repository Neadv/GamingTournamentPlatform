
using GamingTournamentPlatform.Application.Users.Queries;

namespace GamingTournamentPlatform.Application.Teams.Queries.ReadApplication
{
    public class ReadTeamApplicationDTO
    {
        public int Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public bool Invitation { get; set; }

        public int UserId { get; set; }
        public ReadUserDTO? User { get; set; }

        public int TeamId { get; set; }
        public ReadTeamDTO? Team { get; set; }
    }
}
