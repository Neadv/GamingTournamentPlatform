using FluentValidation;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.UpdateRegistration
{
    public class UpdateRegistrationCommandValidator : AbstractValidator<UpdateRegistrationCommand>
    {
        public UpdateRegistrationCommandValidator()
        {
            RuleFor(x => x.CountOfParticipants).GreaterThanOrEqualTo(2);
            RuleFor(x => x.RegistrationDeadline).GreaterThan(DateTime.Now);
            RuleFor(x => x.TournamentId).GreaterThan(0);
        }
    }
}
