using AutoMapper;

using GamingTournamentPlatform.Application.Common.Exceptions;
using GamingTournamentPlatform.Application.Common.Interfaces;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace GamingTournamentPlatform.Application.Categories.Queries.Read
{
    public class ReadCategoryCommandHandler : IRequestHandler<ReadCategoryCommand, ReadCategoryDTO>
    {
        private readonly IApplicationDbContext _applicationDbContext;
        private readonly IMapper _mapper;

        public ReadCategoryCommandHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }

        public async Task<ReadCategoryDTO> Handle(ReadCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _applicationDbContext.TournamentCategories.Include(c => c.Children).FirstOrDefaultAsync(c => c.Id == request.CategoryId);
            if (category == null)
                throw new NotFoundException();

            return _mapper.Map<ReadCategoryDTO>(category);
        }
    }
}
