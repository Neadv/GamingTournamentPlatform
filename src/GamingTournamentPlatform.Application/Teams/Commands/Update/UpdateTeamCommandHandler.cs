using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Commands.Update
{
    public class UpdateTeamCommandHandler : IRequestHandler<UpdateTeamCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public UpdateTeamCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
        {
            _context = context;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(UpdateTeamCommand request, CancellationToken cancellationToken)
        {
            var team = await _context.Teams.FindAsync(request.Id);
            if (team == null)
                throw new NotFoundException(nameof(team));

            if (team.LeaderId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Leader"] = new string[] { "Only team leader can modify team parameters" }
                });
            }

            _mapper.Map(request, team);

            _context.Teams.Update(team);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
