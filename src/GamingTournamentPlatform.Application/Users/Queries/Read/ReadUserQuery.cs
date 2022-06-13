using MediatR;

namespace GamingTournamentPlatform.Application.Users.Queries.Read
{
    public class ReadUserQuery: IRequest<ReadUserDetailsDTO>
    {
        public int Id { get; set; }
    }
}
