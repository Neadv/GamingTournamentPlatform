import { TokenPayload } from "../models/TokenPayload";
import { Token } from "../models/Token";
import localStorageService from "./localStorageService";

class TokenService {
    private readonly tokenKey = "ACCESS_TOKEN";

    public save(token: Token) {
        localStorageService.save(this.tokenKey, token);
    }

    public getToken() {
        return localStorageService.get<Token>(this.tokenKey);
    }

    public getTokenPayload(token?: string) {
        if (!token) {
            token = this.getToken()?.accessToken;
        }
        if (token) {
            try {
                const base64 = token.split(".")[1];
                const json = atob(base64);
                const payload: TokenPayload = JSON.parse(json);
                return payload;
            } catch {
                return null;
            }
        }
        return null;
    }

    public removeToken() {
        localStorageService.remove(this.tokenKey);
    }
}

export default new TokenService();
