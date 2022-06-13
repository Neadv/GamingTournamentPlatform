using AutoMapper;

using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Application.Teams.Queries.ReadApplication;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Users.Queries.TeamApplications
{
    public class TeamApplicationQueryHandler : IRequestHandler<TeamApplicationQuery, IEnumerable<ReadTeamApplicationDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public TeamApplicationQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
        {
            _context = context;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReadTeamApplicationDTO>> Handle(TeamApplicationQuery request, CancellationToken cancellationToken)
        {
            var applications = await _context.Users.Include(u => u.TeamApplications)
                                                   .ThenInclude(a => a.Team)
                                                   .Where(u => u.Id == _currentUserService.UserId)
                                                   .SelectMany(u => u.TeamApplications)
                                                   .ToListAsync();

            return _mapper.Map<IEnumerable<ReadTeamApplicationDTO>>(applications);
        }
    }
}
