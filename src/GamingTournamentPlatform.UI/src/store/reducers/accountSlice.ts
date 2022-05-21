import { createSlice } from "@reduxjs/toolkit";
import { Token } from "../../models/Token";
import { User } from "../../models/User";
import tokenService from "../../services/tokenService";
import userService from "../../services/userService";

interface AccountState {
    user: User | null;
    token: Token | null;
    isAuthorized: boolean;
}

const token = tokenService.getToken();

const initialState: AccountState = {
    token: token,
    user: token ? userService.getUserFromToken() : null,
    isAuthorized: token !== null,
};

const accountSlice = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {},
});

export default accountSlice.reducer;
