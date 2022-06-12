using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Domain.Entities;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.FinishRegistration
{
    public class FinishRegistrationCommandHanlder : IRequestHandler<FinishRegistrationCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public FinishRegistrationCommandHanlder(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(FinishRegistrationCommand request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.Include(t => t.Category)
                                                       .Include(t => t.UserParticipants)
                                                       .Include(t => t.TeamParticipants)
                                                       .Include(t => t.RegistrationInfo)
                                                         .ThenInclude(r => r!.TournamentApplications)
                                                       .FirstOrDefaultAsync(t => t.Id == request.Id);

            if (tournament == null)
                throw new NotFoundException();

            if (tournament.OrganizerId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Organizer"] = new string[] { "Only organizer can invite new participant" }
                });
            }

            if (tournament.State != Domain.Enums.TournamentState.New || tournament.State != Domain.Enums.TournamentState.Registration)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["State"] = new string[] { "Editing is available only for tournaments with state: 'registration'" }
                });
            }

            if (tournament.GetParticipantCount() < 2 || !IsPowerOfTwo(tournament.GetParticipantCount()))
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Count of participants"] = new string[] { "Count of participants" }
                });
            }

            tournament.RegistrationInfo!.TournamentApplications.Clear();
            tournament.State = Domain.Enums.TournamentState.NotStarted;

            InitialStages(tournament);

            _context.Tournaments.Update(tournament);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }

        private void InitialStages(Tournament tournament)
        {
            var firstStage = CreateStages(tournament.GetParticipantCount(), tournament);
            if (tournament.IsTeamTournament)
            {
                for (int i = 0; i < firstStage.TournamentTeamRounds.Count; i++)
                {
                    firstStage.TournamentTeamRounds[i].FirstParticipant = tournament.TeamParticipants[i * 2];
                    firstStage.TournamentTeamRounds[i].SecondParticipant = tournament.TeamParticipants[i * 2 + 1];
                }
            }
            else
            {
                for (int i = 0; i < firstStage.TournamentUserRounds.Count; i++)
                {
                    firstStage.TournamentUserRounds[i].FirstParticipant = tournament.UserParticipants[i * 2];
                    firstStage.TournamentUserRounds[i].SecondParticipant = tournament.UserParticipants[i * 2 + 1];
                }
            }
        }

        private TournamentStage CreateStages(int count, Tournament tournament)
        {
            var stage = new TournamentStage { State = Domain.Enums.TournamentStageState.NotStarted, Name = GetStageNane(count) };
            tournament.Stages.Add(stage);

            for (int i = 0; i < count / 2; i++)
            {
                if (tournament.IsTeamTournament)
                {
                    stage.TournamentTeamRounds.Add(new TournamentTeamRound { Date = DateTime.Today });
                }
                else
                {
                    stage.TournamentUserRounds.Add(new TournamentUserRound { Date = DateTime.Today });
                }
            }

            if (count / 2 == 1)
                return stage;

            var nextStage = CreateStages(count / 2, tournament);

            if (tournament.IsTeamTournament)
            {
                for (int i = 0; i < nextStage.TournamentTeamRounds.Count; i++)
                {
                    stage.TournamentTeamRounds[i * 2].NextRound = nextStage.TournamentTeamRounds[i];
                    stage.TournamentTeamRounds[i * 2 + 1].NextRound = nextStage.TournamentTeamRounds[i];
                }    
            }
            else
            {
                for (int i = 0; i < nextStage.TournamentUserRounds.Count; i++)
                {
                    stage.TournamentUserRounds[i * 2].NextRound = nextStage.TournamentUserRounds[i];
                    stage.TournamentUserRounds[i * 2 + 1].NextRound = nextStage.TournamentUserRounds[i];
                }
            }

            return stage;
        }

        private static string GetStageNane(int count)
        {
            int value = count / 2;

            if (value == 1)
                return "Final";
            else if (value == 2)
                return "Semi-Final";

            return $"1/{value}";
        }

        private static bool IsPowerOfTwo(int x)
        {
            return (x & (x - 1)) == 0;
        }
    }
}
