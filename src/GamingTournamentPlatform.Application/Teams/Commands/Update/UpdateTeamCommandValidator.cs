using FluentValidation;

namespace GamingTournamentPlatform.Application.Teams.Commands.Update
{
    public class UpdateTeamCommandValidator : AbstractValidator<UpdateTeamCommand>
    {
        public UpdateTeamCommandValidator()
        {
            RuleFor(c => c.Name).MinimumLength(4).MaximumLength(25).NotEmpty();
            RuleFor(c => c.Description).MinimumLength(10).NotEmpty();
            RuleFor(c => c.CategoryId).GreaterThan(0);
            RuleFor(c => c.Id).GreaterThan(0);
        }
    }
}
