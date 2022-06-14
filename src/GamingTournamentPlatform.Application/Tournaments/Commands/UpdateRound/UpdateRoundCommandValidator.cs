using FluentValidation;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.UpdateRound
{
    public class UpdateRoundCommandValidator : AbstractValidator<UpdateRoundCommand>
    {
        public UpdateRoundCommandValidator()
        {
            RuleFor(x => x.TournamentId).GreaterThan(0);
            RuleFor(x => x.RoundId).GreaterThan(0);
        }
    }
}
