import { TokenPayload } from "../models/TokenPayload";
import { User } from "../models/User";
import tokenService from "./tokenService";

class userService {
    public getUserFromToken() {
        const tokenPayload = tokenService.getTokenPayload();
        if (tokenPayload) {
            return this.getUserFromPayload(tokenPayload);
        }
        return null;
    }

    private getUserFromPayload(payload: TokenPayload): User {
        let roles: string[];
        if (Array.isArray(payload.role)) {
            roles = [...payload.role];
        } else {
            roles = [payload.role];
        }

        return {
            id: Number(payload.nameid),
            email: payload.email,
            username: payload.name,
            roles: roles,
        };
    }
}

export default new userService();
