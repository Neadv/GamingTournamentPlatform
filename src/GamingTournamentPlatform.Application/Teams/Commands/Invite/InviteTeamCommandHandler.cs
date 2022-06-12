using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Domain.Entities;

using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Commands.Invite
{
    public class InviteTeamCommandHandler : IRequestHandler<InviteTeamCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly IUserService _userService;

        public InviteTeamCommandHandler(IApplicationDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        public async Task<Unit> Handle(InviteTeamCommand request, CancellationToken cancellationToken)
        {
            var team = await _context.Teams.FindAsync(request.TeamId);
            if (team == null)
                throw new NotFoundException(nameof(team));

            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
                throw new NotFoundException(nameof(user));

            if (request.Invitation)
            {
                var currentUser = _userService.GetCurrentUserAsync();
                if (team.LeaderId != currentUser.Id)
                {
                    throw new ValidationException(new Dictionary<string, string[]>
                    {
                        ["Leader"] = new string[] { "Only team leader can invite new participant" }
                    });
                }
            }

            TeamUserApplication application = new TeamUserApplication(user, team, request.Message, request.Invitation);

            _context.TeamUserApplications.Add(application);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
