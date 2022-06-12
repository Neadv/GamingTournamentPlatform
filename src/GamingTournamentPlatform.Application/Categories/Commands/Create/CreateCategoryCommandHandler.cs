using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;
using GamingTournamentPlatform.Domain.Entities;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Categories.Commands.Create
{
    public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, int>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IMapper _mapper;

        public CreateCategoryCommandHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }

        public async Task<int> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = _mapper.Map<TournamentCategory>(request);


            if (await _applicationDbContext.TournamentCategories.FirstOrDefaultAsync(c => c.Name.ToLower() == category.Name.ToLower()) != null)
            {
                throw new ValidationException(new Dictionary<string, string[]> 
                { 
                    ["Name"] = new string[] { $"There is category with that '{category.Name}' name." } 
                });
            }
            if (request.ParentId != null && await _applicationDbContext.TournamentCategories.FindAsync(request.ParentId) == null)
            {
                throw new ValidationException(new Dictionary<string, string[]> 
                { 
                    ["Parent"] = new string[] { $"There is no category with that '{request.ParentId}' id." } 
                });
            }

            _applicationDbContext.TournamentCategories.Add(category);
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return category.Id;
        }
    }
}
