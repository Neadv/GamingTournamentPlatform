using FluentValidation;

namespace GamingTournamentPlatform.Application.Teams.Commands.Invite
{
    public class InviteTeamCommandValidator: AbstractValidator<InviteTeamCommand>
    {
        public InviteTeamCommandValidator()
        {
            RuleFor(x => x.TeamId).GreaterThan(0);
            RuleFor(x => x.UserId).GreaterThan(0);
            RuleFor(x => x.Message).NotEmpty();
        }
    }
}
