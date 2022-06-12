using FluentValidation;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Update
{
    public class UpdateTournamentCommandValidator : AbstractValidator<UpdateTournamentCommand>
    {
        public UpdateTournamentCommandValidator()
        {
            RuleFor(x => x.Name).MinimumLength(5).MaximumLength(256).NotEmpty();
            RuleFor(x => x.Description).MinimumLength(5).NotEmpty();
            RuleFor(x => x.CategoryId).GreaterThan(0);
            RuleFor(x => x.Type).IsInEnum();
        }
    }
}
