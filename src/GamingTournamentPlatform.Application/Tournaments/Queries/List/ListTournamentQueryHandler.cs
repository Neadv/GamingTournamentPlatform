using AutoMapper;

using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Application.Tournaments.Queries.DTOs;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.List
{
    public class ListTournamentQueryHandler : IRequestHandler<ListTournamentQuery, IEnumerable<ReadTournamentDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ListTournamentQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReadTournamentDTO>> Handle(ListTournamentQuery request, CancellationToken cancellationToken)
        {
            var tournaments = await _context.Tournaments.Include(t => t.Category)
                .Include(t => t.RegistrationInfo)
                .Include(t => t.Organizer)
                .ToListAsync();

            return _mapper.Map<IEnumerable<ReadTournamentDTO>>(tournaments);
        }
    }
}
