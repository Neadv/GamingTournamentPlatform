using GamingTournamentPlatform.Application.Common.Security;
using GamingTournamentPlatform.Domain.Enums;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Create
{
    [Authorize]
    public class CreateTournamentCommand : IRequest<int>
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public TournamentType Type { get; set; }
        public DateTime RegistrationDeadline { get; set; }
        public bool IsPublic { get; set; }
    }
}
