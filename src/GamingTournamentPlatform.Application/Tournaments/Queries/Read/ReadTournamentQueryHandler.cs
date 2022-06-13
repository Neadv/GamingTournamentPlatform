using AutoMapper;

using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.Read
{
    public class ReadTournamentQueryHandler : IRequestHandler<ReadTournamentQuery, ReadTournamentDTO>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ReadTournamentQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ReadTournamentDTO> Handle(ReadTournamentQuery request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.Include(t => t.Category)
                .Include(t => t.RegistrationInfo)
                .Include(t => t.Organizer)
                .FirstOrDefaultAsync(t => t.Id == request.Id);

            return _mapper.Map<ReadTournamentDTO>(tournament);
        }
    }
}
