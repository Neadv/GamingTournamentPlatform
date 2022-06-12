using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Domain.Entities;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.StartRound
{
    public class StartRoundCommandHandler : IRequestHandler<StartRoundCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public StartRoundCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(StartRoundCommand request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.Include(t => t.Category)
                                                       .Include(t => t.Stages)
                                                         .ThenInclude(s => s.TournamentTeamRounds)
                                                       .Include(t => t.Stages)
                                                         .ThenInclude(s => s.TournamentUserRounds)
                                                       .FirstOrDefaultAsync(t => t.Id == request.TournamentId);

            if (tournament == null)
                throw new NotFoundException();

            if (tournament.OrganizerId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Organizer"] = new string[] { "Only organizer can edit tournament" }
                });
            }

            TournamentStage? stage;
            TournamentRoundBase round;
            if (tournament.IsTeamTournament)
            {
                stage = tournament.Stages.FirstOrDefault(s => s.TournamentTeamRounds.FirstOrDefault(r => r.Id == request.RoundId) != null);
                if (stage == null)
                    throw new NotFoundException();

                round = stage.TournamentTeamRounds.First(r => r.Id == request.RoundId);
            }
            else
            {
                stage = tournament.Stages.FirstOrDefault(s => s.TournamentUserRounds.FirstOrDefault(r => r.Id == request.RoundId) != null);
                if (stage == null)
                    throw new NotFoundException();

                round = stage.TournamentUserRounds.First(r => r.Id == request.RoundId);
            }

            if (round.State != Domain.Enums.TournamentRoundState.Finished && stage.State != Domain.Enums.TournamentStageState.Finished)
            {
                round.State = Domain.Enums.TournamentRoundState.InProgress;
                stage.State = Domain.Enums.TournamentStageState.InProgress;

                _context.Tournaments.Update(tournament);
                await _context.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }
    }
}
