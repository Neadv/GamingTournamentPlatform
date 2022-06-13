import { TeamUserApplication } from "models/TeamUserApplication";
import { User } from "models/User";
import { UserDetails } from "models/UserDetails";
import api from ".";

function loadUsers(): Promise<User[]> {
    return api.get("user").then((r) => r.data);
}

function loadUserById(id: number): Promise<UserDetails> {
    return api.get("user/" + id).then((r) => r.data);
}

function loadUserTeamApplication(): Promise<TeamUserApplication[]> {
    return api.get("user/team/application").then((r) => r.data);
}

export default {
    loadUsers,
    loadUserById,
    loadUserTeamApplication,
};
