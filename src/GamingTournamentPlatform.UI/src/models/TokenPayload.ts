export interface TokenPayload {
    nameid: string;
    name: string;
    email: string;
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
    role: string | string[];
}
