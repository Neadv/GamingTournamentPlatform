using MediatR;

namespace GamingTournamentPlatform.Application.Categories.Queries.Read
{
    public class ReadCategoryCommand : IRequest<ReadCategoryDTO>
    {
        public int CategoryId { get; set; }
    }
}
