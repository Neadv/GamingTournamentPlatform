using GamingTournamentPlatform.Application.Tournaments.Queries.DTOs;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.Details
{
    public class DetailsTournamentQuery : IRequest<TournamentDTO>
    {
        public int Id { get; set; }
    }
}
