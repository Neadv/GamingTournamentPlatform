import { Team } from "./Team";
import { User } from "./User";

export interface UserDetails extends User {
    leaderTeams: Team[];
    teams: Team[];
}
