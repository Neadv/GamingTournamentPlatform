using AutoMapper;

using GamingTournamentPlatform.Application.Categories.Commands.Create;
using GamingTournamentPlatform.Application.Categories.Commands.Update;
using GamingTournamentPlatform.Application.Categories.Queries;
using GamingTournamentPlatform.Domain.Entities;

namespace GamingTournamentPlatform.Application.Common.Mappings.Profiles
{
    public class CategoryProfiles : Profile
    {
        public CategoryProfiles()
        {
            CreateMap<CreateCategoryCommand, TournamentCategory>();
            CreateMap<UpdateCategoryCommand, TournamentCategory>();
            CreateMap<TournamentCategory, ReadCategoryDTO>();
        }
    }
}
