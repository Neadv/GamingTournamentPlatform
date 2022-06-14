
using GamingTournamentPlatform.Domain.Enums;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.ReadRound
{
    public class ReadTournamentRoundDTO
    {
        public int Id { get; set; }

        public TournamentRoundState State { get; set; }

        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? YoutubeUrl { get; set; }

        public bool? FirstParticipantWon { get; set; }

        public int? FirstParticipantId { get; set; }

        public int? SecondParticipantId { get; set; }

        public int? NextRoundId { get; set; }
    }
}
