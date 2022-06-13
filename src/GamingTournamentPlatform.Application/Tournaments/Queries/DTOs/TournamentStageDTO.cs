using GamingTournamentPlatform.Domain.Enums;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.DTOs
{
    public class TournamentStageDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public TournamentStageState State { get; set; }

        public IEnumerable<TournamentTeamRoundDTO> TournamentTeamRounds { get; set; } = new List<TournamentTeamRoundDTO>();
        public IEnumerable<TournamentUserRoundDTO> TournamentUserRounds { get; set; } = new List<TournamentUserRoundDTO>();
    }
}