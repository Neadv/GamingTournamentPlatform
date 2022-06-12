using AutoMapper;

using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Teams.Queries.Category
{
    public class CategoryTeamQueryHandler : IRequestHandler<CategoryTeamQuery, IEnumerable<ReadTeamDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CategoryTeamQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReadTeamDTO>> Handle(CategoryTeamQuery request, CancellationToken cancellationToken)
        {
            var teams = await _context.Teams.Include(t => t.Leader).Include(t => t.Participants).Where(t => t.CategoryId == request.CategoryId).ToListAsync();
            return _mapper.Map<IEnumerable<ReadTeamDTO>>(teams);
        }
    }
}
