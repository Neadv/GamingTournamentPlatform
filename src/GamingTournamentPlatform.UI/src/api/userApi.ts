import { User } from "models/User";
import api from ".";

function loadUsers(): Promise<User[]> {
    return api.get("user").then((r) => r.data);
}

function loadUserById(id: number): Promise<User> {
    return api.get("user/" + id).then((r) => r.data);
}

export default {
    loadUsers,
    loadUserById,
};
