
using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.ReadRound
{
    public class ReadRoundQueryHandler : IRequestHandler<ReadRoundQuery, ReadTournamentRoundDTO>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public ReadRoundQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
        {
            _context = context;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<ReadTournamentRoundDTO> Handle(ReadRoundQuery request, CancellationToken cancellationToken)
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

            ReadTournamentRoundDTO dto;
            if (tournament.IsTeamTournament)
            {
                var stage = tournament.Stages.FirstOrDefault(s => s.TournamentTeamRounds.FirstOrDefault(r => r.Id == request.RoundId) != null);
                if (stage == null)
                    throw new NotFoundException();

                var round = stage.TournamentTeamRounds.First(r => r.Id == request.RoundId);

                dto = _mapper.Map<ReadTournamentRoundDTO>(round);
            }
            else
            {
                var stage = tournament.Stages.FirstOrDefault(s => s.TournamentUserRounds.FirstOrDefault(r => r.Id == request.RoundId) != null);
                if (stage == null)
                    throw new NotFoundException();

                var round = stage.TournamentUserRounds.First(r => r.Id == request.RoundId);

                dto = _mapper.Map<ReadTournamentRoundDTO>(round);
            }

            return dto;
        }
    }
}
