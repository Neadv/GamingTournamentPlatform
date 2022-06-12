import { Team } from "./Team";
import { Tournament } from "./Tournament";

export interface TournamentTeamApplication {
    id: number;
    invitation: boolean;
    team: Team;
    tournament: Tournament;
}
