import { User } from "models/User";
import { TournamentRound } from "./TournamentRound";

export interface TournamentUserRound extends TournamentRound {
    firstParticipant?: User;
    secondParticipant?: User;
}
