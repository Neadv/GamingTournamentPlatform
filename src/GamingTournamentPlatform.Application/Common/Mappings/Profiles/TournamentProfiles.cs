using AutoMapper;

using GamingTournamentPlatform.Application.Tournaments.Commands.Create;
using GamingTournamentPlatform.Application.Tournaments.Commands.Update;
using GamingTournamentPlatform.Application.Tournaments.Commands.UpdateRound;
using GamingTournamentPlatform.Application.Tournaments.Queries.Applications;
using GamingTournamentPlatform.Application.Tournaments.Queries.DTOs;
using GamingTournamentPlatform.Application.Tournaments.Queries.Read;
using GamingTournamentPlatform.Domain.Entities;

namespace GamingTournamentPlatform.Application.Common.Mappings.Profiles
{
    public class TournamentProfiles : Profile
    {
        public TournamentProfiles()
        {
            CreateMap<CreateTournamentCommand, Tournament>().ForAllMembers(opts => opts.Condition((source, dest, member) => member != null));
            CreateMap<UpdateTournamentCommand, Tournament>().ForAllMembers(opts => opts.Condition((source, dest, member) => member != null));
            CreateMap<UpdateRoundCommand, TournamentTeamRound>().ForAllMembers(opts => opts.Condition((source, dest, member) => member != null));
            CreateMap<UpdateRoundCommand, TournamentUserRound>().ForAllMembers(opts => opts.Condition((source, dest, member) => member != null));

            CreateMap<Tournament, TournamentDTO>();
            CreateMap<TournamentRegistrationInfo, RegistrationInfoDTO>();
            CreateMap<TournamentStage, TournamentStageDTO>();
            CreateMap<TournamentTeamRound, TournamentTeamRoundDTO>();
            CreateMap<TournamentUserRound, TournamentUserRoundDTO>();

            CreateMap<Tournament, ReadTournamentDTO>().ForMember(dest => dest.RegistrationDeadline, opts => opts.MapFrom(src => src.RegistrationInfo!.RegistrationDeadline));
            CreateMap<TournamentApplication, TournamentApplicationDTO>();
        }
    }
}
