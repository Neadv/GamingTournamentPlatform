using GamingTournamentPlatform.Application.Tournaments.Queries.DTOs;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.List
{
    public class ListTournamentQuery : IRequest<IEnumerable<ReadTournamentDTO>>
    {
    }
}
