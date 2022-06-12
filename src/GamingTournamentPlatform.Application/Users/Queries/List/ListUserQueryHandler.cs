using AutoMapper;

using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Users.Queries.List
{
    public class ListUserQueryHandler : IRequestHandler<ListUserQuery, IEnumerable<ReadUserDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ListUserQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReadUserDTO>> Handle(ListUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.ToListAsync();
            return _mapper.Map<IEnumerable<ReadUserDTO>>(user);
        }
    }
}
