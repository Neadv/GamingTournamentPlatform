using GamingTournamentPlatform.Application.Common.Security;
using GamingTournamentPlatform.Application.Teams.Queries.ReadApplication;

using MediatR;

namespace GamingTournamentPlatform.Application.Users.Queries.TeamApplications
{
    [Authorize]
    public class TeamApplicationQuery : IRequest<IEnumerable<ReadTeamApplicationDTO>>
    {

    }
}
