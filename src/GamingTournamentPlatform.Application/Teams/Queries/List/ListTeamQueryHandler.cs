using AutoMapper;

using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Teams.Queries.List
{
    public class ListTeamQueryHandler : IRequestHandler<ListTeamQuery, IEnumerable<ReadTeamDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ListTeamQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReadTeamDTO>> Handle(ListTeamQuery request, CancellationToken cancellationToken)
        {
            var teams = await _context.Teams.Include(t => t.Leader).Include(t => t.Participants).ToListAsync();
            return _mapper.Map<IEnumerable<ReadTeamDTO>>(teams);
        }
    }
}
