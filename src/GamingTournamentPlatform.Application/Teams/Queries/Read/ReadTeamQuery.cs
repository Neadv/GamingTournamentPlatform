using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Queries.Read
{
    public class ReadTeamQuery: IRequest<ReadTeamDTO>
    {
        public int Id { get; set; }
    }
}
