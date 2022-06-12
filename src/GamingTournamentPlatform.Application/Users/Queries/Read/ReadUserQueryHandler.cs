using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

namespace GamingTournamentPlatform.Application.Users.Queries.Read
{
    public class ReadUserQueryHandler : IRequestHandler<ReadUserQuery, ReadUserDTO>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ReadUserQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ReadUserDTO> Handle(ReadUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(request.Id);
            if (user == null)
                throw new NotFoundException(nameof(user));

            return _mapper.Map<ReadUserDTO>(user);
        }
    }
}
