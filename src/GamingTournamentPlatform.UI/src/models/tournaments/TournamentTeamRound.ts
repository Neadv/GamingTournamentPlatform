import { Team } from "models/Team";
import { TournamentRound } from "./TournamentRound";

export interface TournamentTeamRound extends TournamentRound {
    firstParticipant?: Team;
    secondParticipant?: Team;
}
