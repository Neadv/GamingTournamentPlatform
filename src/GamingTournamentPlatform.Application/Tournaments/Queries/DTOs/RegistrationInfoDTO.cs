namespace GamingTournamentPlatform.Application.Tournaments.Queries.DTOs
{
    public class RegistrationInfoDTO
    {
        public int Id { get; set; }

        public DateTime RegistrationDeadline { get; set; }
        public int CountOfParticipants { get; set; }
    }
}