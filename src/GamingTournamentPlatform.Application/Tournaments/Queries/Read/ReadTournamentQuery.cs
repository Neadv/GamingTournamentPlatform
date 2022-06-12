﻿using GamingTournamentPlatform.Application.Tournaments.Queries.DTOs;

using MediatR;

namespace GamingTournamentPlatform.Application.Tournaments.Queries.Read
{
    public class ReadTournamentQuery : IRequest<ReadTournamentDTO>
    {
        public int Id { get; set; }
    }
}
