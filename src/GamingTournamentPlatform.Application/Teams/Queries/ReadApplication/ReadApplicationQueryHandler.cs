using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Teams.Queries.ReadApplication
{
    public class ReadApplicationQueryHandler : IRequestHandler<ReadApplicationQuery, IEnumerable<ReadTeamApplicationDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public ReadApplicationQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
        {
            _context = context;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReadTeamApplicationDTO>> Handle(ReadApplicationQuery request, CancellationToken cancellationToken)
        {
            var team = await _context.Teams.Include(t => t.Applications).ThenInclude(a => a.User).FirstOrDefaultAsync(t => t.Id == request.TeamId);
            if (team == null)
                throw new NotFoundException(nameof(team));

            if (team.LeaderId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Leader"] = new string[] { "Only team leader can modify team parameters" }
                });
            }

            return _mapper.Map<IEnumerable<ReadTeamApplicationDTO>>(team.Applications);
        }
    }
}
