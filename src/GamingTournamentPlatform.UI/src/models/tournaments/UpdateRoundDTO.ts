export interface UpdateRoundDTO {
    tournamentId: number;
    roundId: number;
    date: string;
    description: string;
    youtubeUrl?: string;
}
