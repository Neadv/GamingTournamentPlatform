using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Invite
{
    [Authorize]
    public class InviteTournamentCommand : IRequest
    {
        public int TournamentId { get; set; }
        public int ParticipantId { get; set; }
        public bool Invitation { get; set; } = false;
    }
}
