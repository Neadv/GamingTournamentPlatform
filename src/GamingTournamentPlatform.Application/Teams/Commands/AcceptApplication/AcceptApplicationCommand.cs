using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Commands.AcceptApplication
{
    public class AcceptApplicationCommand : IRequest
    {
        public int TeamId { get; set; }
        public int ApplicationId { get; set; }
    }
}
