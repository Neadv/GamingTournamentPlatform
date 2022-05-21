import api from ".";
import { Token } from "../models/Token";

function login(username: string, password: string): Promise<Token> {
    return api
        .post<Token>("authorization/login", { username, password })
        .then((r) => r.data);
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
