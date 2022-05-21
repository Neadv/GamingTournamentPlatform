using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Application.Common.Models;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Categories.Commands.Delete
{
    public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public DeleteCategoryCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Unit> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _applicationDbContext.TournamentCategories.Include(c => c.Children)
                .Include(c => c.Teams)
                .FirstOrDefaultAsync(r => r.Id == request.CategoryId);
            if (category == null)
                throw new NotFoundException();

            var validationResult = new Result();

            if (category.AllowCreatingTeams && category.Teams.Count > 0)
                validationResult.AddError("Teams", "It's not possible deleting a category which has teams.");
            if (category.Children.Count > 0)
                validationResult.AddError("Children", "It's not possible deleting a category which has children.");

            if (!validationResult.Succeeded)
                throw new ValidationException(validationResult);

            _applicationDbContext.TournamentCategories.Remove(category);
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
