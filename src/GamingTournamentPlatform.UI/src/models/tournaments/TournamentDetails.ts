import { Category } from "models/Category";
import { Team } from "models/Team";
import { User } from "models/User";
import { TournamentRegistrationInfo } from "./TournamentRegistrationInfo";
import { TournamentStage } from "./TournamentStage";

export enum TournamentState {
    New,
    Registration,
    NotStarted,
    InProgress,
    Finished,
}

export enum TournamentType {
    SingleElimination,
    DoubleElimination,
}

export interface TournamentDetails {
    id: number;
    state: TournamentState;
    type: TournamentType;
    isPublic: boolean;

    title: string;
    description: string;

    organizerId: number;
    organizer?: User;

    categoryId: number;
    category?: Category;

    registrationInfo: TournamentRegistrationInfo;

    stages: TournamentStage[];

    teamParticipants: Team[];
    userParticipants: User[];
}
