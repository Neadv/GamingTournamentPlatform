using GamingTournamentPlatform.Application.Common.Security;

using MediatR;

namespace GamingTournamentPlatform.Application.Categories.Commands.Update
{
    [Authorize("Admin")]
    public class UpdateCategoryCommand : IRequest
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool AllowCreatingTeams { get; set; }
        public int? ParentId { get; set; }
    }
}
