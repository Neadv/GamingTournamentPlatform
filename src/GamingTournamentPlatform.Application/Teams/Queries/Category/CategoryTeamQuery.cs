using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Queries.Category
{
    public class CategoryTeamQuery: IRequest<IEnumerable<ReadTeamDTO>>
    {
        public int CategoryId { get; set; }
    }
}
