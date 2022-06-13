using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Domain.Entities;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Invite
{
    public class InviteTournamentCommandHandler : IRequestHandler<InviteTournamentCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public InviteTournamentCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(InviteTournamentCommand request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.Include(t => t.RegistrationInfo).Include(t => t.Category).FirstOrDefaultAsync(t => t.Id == request.TournamentId);
            if (tournament == null)
                throw new NotFoundException();

            TournamentApplication application;
            if (tournament.IsTeamTournament)
            {
                var team = await _context.Teams.FirstOrDefaultAsync(t => t.CategoryId == tournament.CategoryId && t.Id == request.ParticipantId);
                if (team == null)
                    throw new NotFoundException();

                application = new TournamentApplication { RegistrationInfo = tournament.RegistrationInfo, Team = team, Message = request.Message };
            }
            else
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.ParticipantId);
                if (user == null)
                    throw new NotFoundException();

                application = new TournamentApplication { RegistrationInfo = tournament.RegistrationInfo, User = user, Message = request.Message };
            }

            if (request.Invitation)
            {
                application.Inventation = true;
                if (tournament.OrganizerId != _currentUserService.UserId)
                {
                    throw new ValidationException(new Dictionary<string, string[]>
                    {
                        ["Leader"] = new string[] { "Only organizer can invite new participant" }
                    });
                }
            }

            if (DateTime.Now > tournament.RegistrationInfo?.RegistrationDeadline)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["RegistrationDeadline"] = new string[] { "RegistrationDeadline" }
                });
            }

            tournament.RegistrationInfo!.TournamentApplications.Add(application);
            
            _context.Tournaments.Update(tournament);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
