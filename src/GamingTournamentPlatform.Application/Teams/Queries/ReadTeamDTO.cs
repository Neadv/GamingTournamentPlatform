using GamingTournamentPlatform.Application.Users.Queries;

namespace GamingTournamentPlatform.Application.Teams.Queries
{
    public class ReadTeamDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public int CategoryId { get; set; }

        public int LeaderId { get; set; }
        public ReadUserDTO? Leader { get; set; }

        public IEnumerable<ReadUserDTO> Participants { get; set; } = new List<ReadUserDTO>();
    }
}
