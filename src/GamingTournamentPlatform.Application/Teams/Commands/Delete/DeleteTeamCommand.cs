using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Commands.Delete
{
    public class DeleteTeamCommand: IRequest
    {
        public int Id { get; set; }
    }
}
