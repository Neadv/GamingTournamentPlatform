using GamingTournamentPlatform.Application.Teams.Queries;
using GamingTournamentPlatform.Domain.Enums;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.DTOs
{
    public class TournamentTeamRoundDTO
    {
        public int Id { get; set; }

        public TournamentRoundState State { get; set; }

        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? YoutubeUrl { get; set; }

        public bool? FirstParticipantWon { get; set; }

        public int? FirstParticipantId { get; set; }
        public ReadTeamDTO? FirstParticipant { get; set; }

        public int? SecondParticipantId { get; set; }
        public ReadTeamDTO? SecondParticipant { get; set; }

        public int? NextRoundId { get; set; }
    }
}