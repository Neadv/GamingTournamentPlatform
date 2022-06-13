using GamingTournamentPlatform.Application.Common.Security;
using GamingTournamentPlatform.Domain.Enums;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Update
{
    [Authorize]
    public class UpdateTournamentCommand : IRequest
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public TournamentType Type { get; set; }
    }
}
