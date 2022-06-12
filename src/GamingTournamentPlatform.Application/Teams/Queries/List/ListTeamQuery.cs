using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Queries.List
{
    public class ListTeamQuery: IRequest<IEnumerable<ReadTeamDTO>>
    {

    }
}
