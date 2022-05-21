using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

namespace GamingTournamentPlatform.Application.Categories.Commands.Update
{
    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, Unit>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IMapper _mapper;

        public UpdateCategoryCommandHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _applicationDbContext.TournamentCategories.FindAsync(request.Id);
            if (category == null)
                throw new NotFoundException();

            if (request.ParentId != null && await _applicationDbContext.TournamentCategories.FindAsync(request.ParentId) == null)
                throw new ValidationException(new Dictionary<string, string[]> { ["Parent"] = new string[] { $"There is no category with that '{request.ParentId}' id." } });

            _mapper.Map(request, category);

            _applicationDbContext.TournamentCategories.Update(category);
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
