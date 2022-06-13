import { Team } from "./Team";
import { User } from "./User";

export interface TeamUserApplication {
    id: number;
    teamId: number;
    userId: number;
    invitation: boolean;
    message: string;
    user?: User;
    team?: Team;
}
