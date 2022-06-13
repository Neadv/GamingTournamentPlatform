using GamingTournamentPlatform.Application.Teams.Queries;

namespace GamingTournamentPlatform.Application.Users.Queries.Read
{
    public class ReadUserDetailsDTO : ReadUserDTO
    {
        public virtual IEnumerable<ReadTeamDTO> LeaderTeams { get; set; } = new List<ReadTeamDTO>();
        public virtual IEnumerable<ReadTeamDTO> Teams { get; set; } = new List<ReadTeamDTO>();
    }
}
