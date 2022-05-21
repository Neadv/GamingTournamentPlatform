
using FluentValidation;

using GamingTournamentPlatform.Domain.Entities;

namespace GamingTournamentPlatform.Application.Categories.Commands.Update
{
    public class UpdateCategoryCommandValidator : AbstractValidator<TournamentCategory>
    {
        public UpdateCategoryCommandValidator()
        {
            RuleFor(x => x.Name)
                .MinimumLength(3)
                .MaximumLength(50)
                .NotEmpty();

            RuleFor(x => x.Description)
                .MinimumLength(6)
                .NotEmpty();
        }
    }
}
