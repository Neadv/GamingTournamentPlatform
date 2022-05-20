using FluentValidation;

namespace GamingTournamentPlatform.Application.Authorization.Commands.Register
{
    public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
    {
        public RegisterUserCommandValidator()
        {
            RuleFor(c => c.Email)
                .EmailAddress()
                .NotEmpty();
            RuleFor(c => c.UserName)
                .MinimumLength(4)
                .MaximumLength(20)
                .NotEmpty();
            RuleFor(c => c.Password)
                .MinimumLength(6)
                .MaximumLength(20)
                .NotEmpty();
        }
    }
}
