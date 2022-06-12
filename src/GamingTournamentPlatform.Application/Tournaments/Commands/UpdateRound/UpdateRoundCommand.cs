using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.UpdateRound
{
    [Authorize]
    public class UpdateRoundCommand : IRequest
    {
        public int TournamentId { get; set; }
        public int RoundId { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? YoutubeURL { get; set; }
        public DateTime Date { get; set; }
    }
}
