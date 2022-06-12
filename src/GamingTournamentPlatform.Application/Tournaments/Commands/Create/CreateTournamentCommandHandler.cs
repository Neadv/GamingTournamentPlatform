
using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Domain.Entities;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Create
{
    public class CreateTournamentCommandHandler : IRequestHandler<CreateTournamentCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public CreateTournamentCommandHandler(IApplicationDbContext context, IMapper mapper, IUserService userService)
        {
            _context = context;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<int> Handle(CreateTournamentCommand request, CancellationToken cancellationToken)
        {
            var category = await _context.TournamentCategories.FindAsync(request.CategoryId);
            if (category == null || !category.AllowOrganizeCompetitions)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Category"] = new string[] { $"There is no category with that id: {request.CategoryId} or that category doesn't allow to organize competition" }
                });
            }

            var user = await _userService.GetCurrentUserAsync();

            var tournament = _mapper.Map<Tournament>(request);

            tournament.Organizer = user;
            tournament.RegistrationInfo = new TournamentRegistrationInfo { RegistrationDeadline = request.RegistrationDeadline };

            _context.Tournaments.Add(tournament);
            await _context.SaveChangesAsync(cancellationToken);

            return tournament.Id;
        }
    }
}
