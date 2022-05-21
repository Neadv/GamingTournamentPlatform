
using AutoMapper;

using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Categories.Queries.List
{
    public class CategoryListCommandHandler : IRequestHandler<CategoryListCommand, IEnumerable<ReadCategoryDTO>>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IMapper _mapper;

        public CategoryListCommandHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReadCategoryDTO>> Handle(CategoryListCommand request, CancellationToken cancellationToken)
        {
            var categories = await _applicationDbContext.TournamentCategories.Include(c => c.Children).AsNoTracking().ToListAsync();

            categories = categories.Where(c => c.ParentId == null).ToList();

            return _mapper.Map<IEnumerable<ReadCategoryDTO>>(categories);
        }
    }
}
