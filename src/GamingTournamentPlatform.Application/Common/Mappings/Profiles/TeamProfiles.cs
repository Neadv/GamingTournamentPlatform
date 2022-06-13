using AutoMapper;

using GamingTournamentPlatform.Application.Teams.Commands.Create;
using GamingTournamentPlatform.Application.Teams.Commands.Update;
using GamingTournamentPlatform.Application.Teams.Queries;
using GamingTournamentPlatform.Application.Teams.Queries.ReadApplication;
using GamingTournamentPlatform.Domain.Entities;

namespace GamingTournamentPlatform.Application.Common.Mappings.Profiles
{
    public class TeamProfiles: Profile
    {
        public TeamProfiles()
        {
            CreateMap<CreateTeamCommand, Team>().ForAllMembers(opts => opts.Condition((obj, dest, member) => member != null));
            CreateMap<UpdateTeamCommand, Team>().ForAllMembers(opts => opts.Condition((obj, dest, member) => member != null));
            CreateMap<Team, ReadTeamDTO>();
            CreateMap<TeamUserApplication, ReadTeamApplicationDTO>().ForMember(dest => dest.Invitation, opts => opts.MapFrom(src => src.Inventation));
        }
    }
}
