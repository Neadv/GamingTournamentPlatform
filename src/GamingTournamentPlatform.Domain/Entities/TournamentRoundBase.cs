﻿using GamingTournamentPlatform.Domain.Common;

namespace GamingTournamentPlatform.Domain.Entities
{
    public abstract class TournamentRoundBase : AuditableEntity
    {
        public int Id { get; set; }

        public int TournamentStageId { get; set; }
        public virtual TournamentStage? TournamentStage { get; set; }

        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? YoutubeUrl { get; set; }

        public bool? FirstParticipantWon { get; set; }
    }
}