import api from ".";

function login(username: string, password: string): Promise<void> {
    return api.post("authorization/login", { username, password });
}

function register(
    username: string,
    email: string,
    password: string
): Promise<void> {
    return api.post("authorization/register", { username, email, password });
}

export default {
    login,
    register,
};
