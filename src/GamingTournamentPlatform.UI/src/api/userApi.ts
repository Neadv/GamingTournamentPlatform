import { User } from "models/User";

export const users: User[] = (function (count: number): User[] {
    const users: User[] = [];
    for (let i = 1; i <= count; i++) {
        users.push({
            id: i,
            username: `User${i}`,
            email: `user${i}@mail.com`,
            roles: [],
        });
    }
    return users;
})(40);

function loadUsers(): Promise<User[]> {
    return Promise.resolve(users);
}

function loadUserById(id: number): Promise<User> {
    return Promise.resolve(users.find((u) => u.id == id) as User);
}

export default {
    loadUsers,
    loadUserById,
};
