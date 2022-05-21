using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Categories.Commands.Create
{
    [Authorize("Admin")]
    public class CreateCategoryCommand : IRequest<int>
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool AllowCreatingTeams { get; set; }
        public int? ParentId { get; set; }
    }
}
