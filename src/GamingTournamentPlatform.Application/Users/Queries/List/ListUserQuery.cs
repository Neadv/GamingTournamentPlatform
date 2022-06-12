
using MediatR;

namespace GamingTournamentPlatform.Application.Users.Queries.List
{
    public class ListUserQuery : IRequest<IEnumerable<ReadUserDTO>>
    {

    }
}
