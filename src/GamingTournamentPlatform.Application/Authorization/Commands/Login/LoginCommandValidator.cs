using FluentValidation;

namespace GamingTournamentPlatform.Application.Authorization.Commands.Login
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(x => x.UserName)
                .MinimumLength(4)
                .MaximumLength(20)
                .NotEmpty();
            RuleFor(x => x.Password)
                .MinimumLength(6)
                .MaximumLength(40)
                .NotEmpty();
        }
    }
}
