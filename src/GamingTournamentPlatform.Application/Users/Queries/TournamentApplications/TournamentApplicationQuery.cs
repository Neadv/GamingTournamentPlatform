using GamingTournamentPlatform.Application.Common.Security;
using GamingTournamentPlatform.Application.Tournaments.Queries.DTOs;

using MediatR;

namespace GamingTournamentPlatform.Application.Users.Queries.TournamentApplications
{
    [Authorize]
    public class TournamentApplicationQuery : IRequest<IEnumerable<ReadTournamentApplicationDTO>>
    {

    }
}
