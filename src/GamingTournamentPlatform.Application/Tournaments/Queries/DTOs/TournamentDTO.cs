using GamingTournamentPlatform.Application.Categories.Queries;
using GamingTournamentPlatform.Application.Teams.Queries;
using GamingTournamentPlatform.Application.Users.Queries;
using GamingTournamentPlatform.Domain.Enums;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.DTOs
{
    public class TournamentDTO
    {
        public int Id { get; set; }
        public TournamentState State { get; set; }
        public TournamentType Type { get; set; }
        public bool IsPublic { get; set; } = true;

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        public int OrganizerId { get; set; }
        public ReadUserDTO? Organizer { get; set; }

        public int CategoryId { get; set; }
        public ReadCategoryDTO? Category { get; set; }

        public RegistrationInfoDTO? RegistrationInfo { get; set; }

        public IEnumerable<TournamentStageDTO> Stages { get; set; } = new List<TournamentStageDTO>();

        public IEnumerable<ReadTeamDTO> TeamParticipants { get; set; } = new List<ReadTeamDTO>();
        public IEnumerable<ReadUserDTO> UserParticipants { get; set; } = new List<ReadUserDTO>();
    }
}
