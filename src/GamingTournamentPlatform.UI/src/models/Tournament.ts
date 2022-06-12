import { Category } from "./Category";
import { Team } from "./Team";
import { TournamentTeamApplication } from "./TournamentTeamApplication";
import { User } from "./User";

export enum TournamentType {
    SingleElimination,
    DoubleElimination,
    RoundRobin,
}

export enum TournamentState {
    Created,
    Registration,
    InProgress,
    Finished,
}

export interface Tournament {
    id: number;
    title: string;
    description: string;
    organizer: User[];
    category: Category;
    isPublic: boolean;
    type: TournamentType;
    state: TournamentState;
    createAt: Date;
    finishedAt?: Date;
    registrationDeadline: Date;
    teams: Team[];
    applications: TournamentTeamApplication[];
}
