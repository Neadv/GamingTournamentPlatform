using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Teams.Commands.AcceptApplication
{
    public class AcceptApplicationCommandHandler : IRequestHandler<AcceptApplicationCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public AcceptApplicationCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(AcceptApplicationCommand request, CancellationToken cancellationToken)
        {
            var team = await _context.Teams.Include(t => t.Applications).ThenInclude(a => a.User).FirstOrDefaultAsync(t => t.Id == request.TeamId);
            if (team == null)
                throw new NotFoundException(nameof(team));


            var application = team.Applications.FirstOrDefault(a => a.Id == request.ApplicationId);
            if (application == null)
                throw new NotFoundException();

            if (application.Inventation && _currentUserService.UserId != application.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["User"] = new string[] { "Only invited user can accept application" }
                });
            }

            if (!application.Inventation && team.LeaderId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Leader"] = new string[] { "Only team leader can modify team parameters" }
                });
            }

            team.Applications.Remove(application);
            team.Participants.Add(application.User!);

            _context.Teams.Update(team);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
