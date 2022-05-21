using GamingTournamentPlatform.Application.Common.Models;

using MediatR;

namespace GamingTournamentPlatform.Application.Categories.Queries.List
{
    public class CategoryListCommand : PaginationRequest, IRequest<IEnumerable<ReadCategoryDTO>>
    {
    
    }
}
