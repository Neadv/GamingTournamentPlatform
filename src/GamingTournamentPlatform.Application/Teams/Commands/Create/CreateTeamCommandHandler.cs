using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Domain.Entities;

using MediatR;

namespace GamingTournamentPlatform.Application.Teams.Commands.Create
{
    public class CreateTeamCommandHandler : IRequestHandler<CreateTeamCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public CreateTeamCommandHandler(IApplicationDbContext context, IMapper mapper, IUserService userService)
        {
            _context = context;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<int> Handle(CreateTeamCommand request, CancellationToken cancellationToken)
        {
            var category = await _context.TournamentCategories.FindAsync(request.CategoryId);
            if (category == null || !category.AllowCreatingTeams)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Category"] = new string[] { $"There is no category with that id: {request.CategoryId} or that category doesn't allow to create teams" }
                });
            }

            var team = _mapper.Map<Team>(request);

            var user = await _userService.GetCurrentUserAsync();

            team.AddLeader(user);

            _context.Teams.Add(team);
            await _context.SaveChangesAsync(cancellationToken);

            return team.CategoryId;
        }
    }
}
