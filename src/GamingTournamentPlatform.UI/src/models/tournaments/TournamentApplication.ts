import { Team } from "models/Team";
import { User } from "models/User";

export interface TournamentApplication {
    id: number;
    message: string;
    inventation: boolean;

    userId?: number;
    user?: User;

    teamId?: number;
    team?: Team;
}
