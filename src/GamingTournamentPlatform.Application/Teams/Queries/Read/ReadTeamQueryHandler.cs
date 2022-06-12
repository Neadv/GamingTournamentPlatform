using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Teams.Queries.Read
{
    public class ReadTeamQueryHandler : IRequestHandler<ReadTeamQuery, ReadTeamDTO>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ReadTeamQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ReadTeamDTO> Handle(ReadTeamQuery request, CancellationToken cancellationToken)
        {
            var team = await _context.Teams.Include(t => t.Category)
                                           .Include(t => t.Leader)
                                           .Include(t => t.Participants)
                                           .FirstOrDefaultAsync(t => t.Id == request.Id);
            if (team == null)
                throw new NotFoundException(nameof(request));

            return _mapper.Map<ReadTeamDTO>(team);  
        }
    }
}
