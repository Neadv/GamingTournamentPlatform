using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Application.Tournaments.Queries.DTOs;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Teams.Queries.TournamentApplication
{
    public class TournamentApplicationQueryHandler : IRequestHandler<TournamentApplicationQuery, IEnumerable<ReadTournamentApplicationDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public TournamentApplicationQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }
        
        public async Task<IEnumerable<ReadTournamentApplicationDTO>> Handle(TournamentApplicationQuery request, CancellationToken cancellationToken)
        {
            var team = await _context.Teams.Include(t => t.TournamentApplications)
                .ThenInclude(a => a.RegistrationInfo)
                .ThenInclude(r => r!.Tournament)
                .FirstOrDefaultAsync(t => t.Id == request.TeamId);

            if (team == null)
                throw new NotFoundException(nameof(team));

            if (team.LeaderId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Leader"] = new string[] { "Only team leader can modify team parameters" }
                });
            }

            return _mapper.Map<IEnumerable<ReadTournamentApplicationDTO>>(team.TournamentApplications);
        }
    }
}
