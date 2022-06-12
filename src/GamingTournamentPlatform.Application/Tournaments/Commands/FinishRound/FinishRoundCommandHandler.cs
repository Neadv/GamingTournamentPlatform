using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Domain.Entities;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.FinishRound
{
    public class FinishRoundCommandHandler : IRequestHandler<FinishRoundCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public FinishRoundCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(FinishRoundCommand request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.Include(t => t.Category)
                                                       .Include(t => t.Stages)
                                                         .ThenInclude(s => s.TournamentTeamRounds)
                                                            .ThenInclude(r => r.NextRound)
                                                       .Include(t => t.Stages)
                                                         .ThenInclude(s => s.TournamentUserRounds)
                                                            .ThenInclude(r => r.NextRound)
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

                var teamRound = stage.TournamentTeamRounds.First(r => r.Id == request.RoundId);

                if (teamRound.NextRound != null)
                {
                    if (teamRound.NextRound.FirstParticipantId == null)
                    {
                        teamRound.NextRound.FirstParticipant = request.FirstParticipantWon ? teamRound.FirstParticipant : teamRound.SecondParticipant;
                    }
                    else if (teamRound.NextRound.SecondParticipantId == null)
                    {
                        teamRound.NextRound.SecondParticipant = request.FirstParticipantWon ? teamRound.FirstParticipant : teamRound.SecondParticipant;
                    }
                }

                round = teamRound;
            }
            else
            {
                stage = tournament.Stages.FirstOrDefault(s => s.TournamentUserRounds.FirstOrDefault(r => r.Id == request.RoundId) != null);
                if (stage == null)
                    throw new NotFoundException();

                var userRound = stage.TournamentUserRounds.First(r => r.Id == request.RoundId);

                if (userRound.NextRound != null)
                {
                    if (userRound.NextRound.FirstParticipantId == null)
                    {
                        userRound.NextRound.FirstParticipant = request.FirstParticipantWon ? userRound.FirstParticipant : userRound.SecondParticipant;
                    }
                    else if (userRound.NextRound.SecondParticipantId == null)
                    {
                        userRound.NextRound.SecondParticipant = request.FirstParticipantWon ? userRound.FirstParticipant : userRound.SecondParticipant;
                    }
                }

                round = userRound;
            }

            if (round.State != Domain.Enums.TournamentRoundState.Finished && stage.State != Domain.Enums.TournamentStageState.Finished)
            {
                round.State = Domain.Enums.TournamentRoundState.Finished;
                round.FirstParticipantWon = request.FirstParticipantWon;

                if (tournament.IsTeamTournament
                    && (stage.TournamentTeamRounds.All(r => r.State == Domain.Enums.TournamentRoundState.Finished)
                    || stage.TournamentUserRounds.All(r => r.State == Domain.Enums.TournamentRoundState.Finished)))
                {
                    stage.State = Domain.Enums.TournamentStageState.Finished;
                }

                _context.Tournaments.Update(tournament);
                await _context.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }
    }
}
