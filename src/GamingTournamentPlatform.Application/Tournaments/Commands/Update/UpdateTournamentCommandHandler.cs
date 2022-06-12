using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Commands.Update
{
    public class UpdateTournamentCommandHandler : IRequestHandler<UpdateTournamentCommand, Unit>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public UpdateTournamentCommandHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(UpdateTournamentCommand request, CancellationToken cancellationToken)
        {
            var tournament = await _context.Tournaments.FindAsync(request.Id);
            if (tournament == null)
                throw new NotFoundException();

            if (tournament.State != Domain.Enums.TournamentState.New)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["State"] = new string[] { "Editing is available only for tournaments with state: 'new'" }
                });
            }

            var category = await _context.TournamentCategories.FindAsync(request.CategoryId);
            if (category == null || !category.AllowOrganizeCompetitions)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Category"] = new string[] { $"There is no category with that id: {request.CategoryId} or that category doesn't allow to organize competition" }
                });
            }

            if (tournament.OrganizerId != _currentUserService.UserId)
            {
                throw new ValidationException(new Dictionary<string, string[]>
                {
                    ["Organizer"] = new string[] { "Only organizer can edit tournament" }
                });
            }

            _mapper.Map(request, tournament);

            _context.Tournaments.Update(tournament);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
