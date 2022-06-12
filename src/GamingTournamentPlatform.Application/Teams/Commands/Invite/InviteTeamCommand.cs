using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Commands.Invite
{
    [Authorize]
    public class InviteTeamCommand: IRequest
    {
        public int TeamId { get; set; }
        public int UserId { get; set; }
        public bool Invitation { get; set; } = false;
        public string Message { get; set; } = string.Empty;
    }
}
