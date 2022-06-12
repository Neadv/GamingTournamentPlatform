using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.AcceptApplication
{
    [Authorize]
    public class AcceptApplicationCommand : IRequest
    {
        public int TournamentId { get; set; }
        public int ApplicationId { get; set; }
    }
}
