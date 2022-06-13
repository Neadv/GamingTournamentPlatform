import { TournamentTeamRound } from "./TournamentTeamRound";
import { TournamentUserRound } from "./TournamentUserRound";

export enum TournamentStageState {
    NotStarted,
    InProgress,
    Finished,
}

export interface TournamentStage {
    id: number;
    name: string;
    state: TournamentStageState;
    tournamentTeamRounds: TournamentTeamRound[];
    tournamentUserRounds: TournamentUserRound[];
}
