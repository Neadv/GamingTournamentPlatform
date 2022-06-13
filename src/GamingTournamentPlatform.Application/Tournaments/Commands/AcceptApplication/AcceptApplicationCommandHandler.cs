using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.AcceptApplication
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
            var tournament = await _context.Tournaments.Include(t => t.Category)
                                                       .Include(t => t.TeamParticipants)
                                                       .Include(t => t.UserParticipants)
                                                       .Include(t => t.RegistrationInfo)
                                                         .ThenInclude(t => t!.TournamentApplications)
                                                       .FirstOrDefaultAsync(t => t.Id == request.TournamentId);
            if (tournament == null)
                throw new NotFoundException();


            if (DateTime.Now > tournament.RegistrationInfo?.RegistrationDeadline)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["RegistrationDeadline"] = new string[] { "RegistrationDeadline" }
                });
            }

            if ((tournament.IsTeamTournament && tournament.TeamParticipants.Count == tournament.RegistrationInfo!.CountOfParticipants) 
                || (!tournament.IsTeamTournament && tournament.UserParticipants.Count == tournament.RegistrationInfo!.CountOfParticipants))
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["CountOfParticipant"] = new string[] { "CountOfParticipant" }
                });
            }


            var application = tournament.RegistrationInfo?.TournamentApplications.FirstOrDefault(a => a.Id == request.ApplicationId);
            if (application == null)
                throw new NotFoundException();

            if (!application.Inventation && tournament.OrganizerId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Organize"] = new string[] { "Only organizer can accept applications" }
                });
            }
            // TODO: Add check for team and user self

            tournament.RegistrationInfo?.TournamentApplications.Remove(application);

            if (tournament.IsTeamTournament)
            {
                var team = await _context.Teams.FindAsync(application.TeamId);
                if (team != null)
                    tournament.TeamParticipants.Add(team);
            }
            else
            {
                var user = await _context.Users.FindAsync(application.UserId);
                if (user != null)
                    tournament.UserParticipants.Add(user);
            }

            _context.Tournaments.Update(tournament);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }

}
