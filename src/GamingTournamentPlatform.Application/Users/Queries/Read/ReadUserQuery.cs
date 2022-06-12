using MediatR;

namespace GamingTournamentPlatform.Application.Users.Queries.Read
{
    public class ReadUserQuery: IRequest<ReadUserDTO>
    {
        public int Id { get; set; }
    }
}
