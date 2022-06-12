
using FluentValidation;

namespace GamingTournamentPlatform.Application.Teams.Commands.Create
{
    public class CreateTeamCommandValidator: AbstractValidator<CreateTeamCommand>
    {
        public CreateTeamCommandValidator()
        {
            RuleFor(c => c.Name).MinimumLength(4).MaximumLength(25).NotEmpty();
            RuleFor(c => c.Description).MinimumLength(10).NotEmpty();
            RuleFor(c => c.CategoryId).GreaterThan(0);
        }
    }
}
