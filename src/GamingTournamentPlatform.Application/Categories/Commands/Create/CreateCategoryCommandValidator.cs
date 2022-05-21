using FluentValidation;

namespace GamingTournamentPlatform.Application.Categories.Commands.Create
{
    public class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
    {
        public CreateCategoryCommandValidator()
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
