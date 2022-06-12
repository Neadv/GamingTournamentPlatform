import { Category } from "./Category";
import { User } from "./User";

export interface Team {
    id: number;
    name: string;
    description: string;
    logo?: string;
    category?: Category;
    categoryId: number;
    leader?: User;
    leaderId: number;
    participants: User[];
}
