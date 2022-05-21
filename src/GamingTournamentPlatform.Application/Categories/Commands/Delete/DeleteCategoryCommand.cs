using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Categories.Commands.Delete
{
    [Authorize("Admin")]
    public class DeleteCategoryCommand : IRequest
    {
        public int CategoryId { get; set; }
    }
}
