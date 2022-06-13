using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Users.Queries.Read
{
    public class ReadUserQueryHandler : IRequestHandler<ReadUserQuery, ReadUserDetailsDTO>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ReadUserQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ReadUserDetailsDTO> Handle(ReadUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Include(u => u.LeaderTeams)
                                           .ThenInclude(t => t.Category)
                                           .Include(u => u.Teams)
                                           .ThenInclude(t => t.Category)
                                           .FirstOrDefaultAsync(u => u.Id == request.Id);
            if (user == null)
                throw new NotFoundException(nameof(user));

            return _mapper.Map<ReadUserDetailsDTO>(user);
        }
    }
}
