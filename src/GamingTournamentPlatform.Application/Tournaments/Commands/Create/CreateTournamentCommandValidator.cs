using FluentValidation;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Create
{
    public class CreateTournamentCommandValidator : AbstractValidator<CreateTournamentCommand>
    {
        public CreateTournamentCommandValidator()
        {
            RuleFor(x => x.Name).MinimumLength(5).MaximumLength(256).NotEmpty();
            RuleFor(x => x.Description).MinimumLength(5).NotEmpty();
            RuleFor(x => x.CategoryId).GreaterThan(0);
            RuleFor(x => x.RegistrationDeadline).GreaterThan(DateTime.Now);
            RuleFor(x => x.Type).IsInEnum();
        }
    }
}
