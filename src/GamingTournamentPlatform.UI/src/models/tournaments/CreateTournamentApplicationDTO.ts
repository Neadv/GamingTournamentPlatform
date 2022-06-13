export interface CreateTournamentApplicationDTO {
    tournamentId: number;
    participantId: number;
    invitation: boolean;
    message: string;
}
