using AutoMapper;

using GamingTournamentPlatform.Application.Users.Queries;
using GamingTournamentPlatform.Application.Users.Queries.Read;
using GamingTournamentPlatform.Domain.Entities;

namespace GamingTournamentPlatform.Application.Common.Mappings.Profiles
{
    public class UserProfiles: Profile
    {
        public UserProfiles()
        {
            CreateMap<User, ReadUserDTO>();
            CreateMap<User, ReadUserDetailsDTO>();
        }
    }
}
