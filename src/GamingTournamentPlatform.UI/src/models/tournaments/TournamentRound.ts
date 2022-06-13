export enum TournamentRoundState {
    NotStarted,
    InProgress,
    Finished,
}

export interface TournamentRound {
    id: number;
    state: TournamentRoundState;
    description: string;
    youtubeUrl?: string;
    firstParticipantWon?: boolean;
    nextRoundId: number;
    firstParticipantId?: number;
    secondParticipantId?: number;
}
