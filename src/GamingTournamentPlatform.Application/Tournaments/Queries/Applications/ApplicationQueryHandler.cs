using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.Applications
{
    public class ApplicationQueryHandler : IRequestHandler<ApplicationsQuery, IEnumerable<TournamentApplicationDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public ApplicationQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
        {
            _context = context;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TournamentApplicationDTO>> Handle(ApplicationsQuery request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.Include(t => t.RegistrationInfo)
                                                         .ThenInclude(r => r!.TournamentApplications)
                                                            .ThenInclude(a => a.User)
                                                       .Include(t => t.RegistrationInfo)
                                                         .ThenInclude(r => r!.TournamentApplications)
                                                            .ThenInclude(a => a.Team)
                                                       .FirstOrDefaultAsync(t => t.Id == request.TournamentId);

            if (tournament == null)
                throw new NotFoundException();

            if (tournament.OrganizerId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Organizer"] = new string[] { "Only organizer can edit tournament" }
                });
            }

            return _mapper.Map<IEnumerable<TournamentApplicationDTO>>(tournament.RegistrationInfo!.TournamentApplications);
        }
    }
}
