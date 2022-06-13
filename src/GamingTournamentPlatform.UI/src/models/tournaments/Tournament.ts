import { Category } from "models/Category";
import { User } from "models/User";
import { TournamentState, TournamentType } from "./TournamentDetails";

export interface Tournament {
    id: number;
    state: TournamentState;
    type: TournamentType;
    isPublic: boolean;

    title: string;
    description: string;

    categoryId: number;
    category?: Category;

    organizerId: number;
    organizer?: User;

    registrationDeadline: string;
}
