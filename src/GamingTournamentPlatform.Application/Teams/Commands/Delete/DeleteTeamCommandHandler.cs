using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Commands.Delete
{
    public class DeleteTeamCommandHandler : IRequestHandler<DeleteTeamCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly IUserService _userService;

        public DeleteTeamCommandHandler(IApplicationDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        public async Task<Unit> Handle(DeleteTeamCommand request, CancellationToken cancellationToken)
        {
            var team = await _context.Teams.FindAsync(request.Id);
            if (team == null)
                throw new NotFoundException(nameof(team));

            var user = await _userService.GetCurrentUserAsync();
            if (team.LeaderId != user.Id || await _userService.IsCurrentUserInRole("Admin"))
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Team"] = new string[] { "Team can be removed by team leader or Admin" }
                });
            }

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
