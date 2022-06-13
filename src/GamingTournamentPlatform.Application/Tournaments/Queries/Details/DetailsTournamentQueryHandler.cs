using AutoMapper;

using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Application.Tournaments.Queries.DTOs;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.Details
{
    public class DetailsTournamentQueryHandler : IRequestHandler<DetailsTournamentQuery, TournamentDTO>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public DetailsTournamentQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<TournamentDTO> Handle(DetailsTournamentQuery request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.Include(t => t.Category)
                                                       .Include(t => t.RegistrationInfo)
                                                       .Include(t => t.TeamParticipants)
                                                       .Include(t => t.UserParticipants)
                                                       .Include(t => t.Stages)
                                                         .ThenInclude(t => t.TournamentTeamRounds)
                                                           .ThenInclude(t => t.FirstParticipant)
                                                       .Include(t => t.Stages)
                                                         .ThenInclude(t => t.TournamentTeamRounds)
                                                           .ThenInclude(t => t.SecondParticipant)
                                                       .Include(t => t.Stages)
                                                         .ThenInclude(t => t.TournamentUserRounds)
                                                           .ThenInclude(t => t.FirstParticipant)
                                                       .Include(t => t.Stages)
                                                         .ThenInclude(t => t.TournamentUserRounds)
                                                           .ThenInclude(t => t.SecondParticipant)
                                                       .AsNoTracking()
                                                       .AsSplitQuery()
                                                       .FirstOrDefaultAsync(t => t.Id == request.Id);

            return _mapper.Map<TournamentDTO>(tournament);
        }
    }
}
