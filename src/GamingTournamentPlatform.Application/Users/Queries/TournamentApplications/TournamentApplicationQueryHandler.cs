using AutoMapper;

using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Application.Tournaments.Queries.DTOs;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Users.Queries.TournamentApplications
{
    public class TournamentApplicationQueryHandler : IRequestHandler<TournamentApplicationQuery, IEnumerable<ReadTournamentApplicationDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public TournamentApplicationQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
        {
            _context = context;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReadTournamentApplicationDTO>> Handle(TournamentApplicationQuery request, CancellationToken cancellationToken)
        {
            var applications = await _context.Users.Include(u => u.TournamentApplications)
                                                   .ThenInclude(a => a.RegistrationInfo)
                                                   .ThenInclude(a => a.Tournament)
                                                   .Where(u => u.Id == _currentUserService.UserId)
                                                   .SelectMany(u => u.TournamentApplications)
                                                   .ToListAsync();

            return _mapper.Map<IEnumerable<ReadTournamentApplicationDTO>>(applications);
        }
    }
}
