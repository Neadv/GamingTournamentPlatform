import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { authorizeClient, removeAuthorization } from "api";
import accountApi from "api/accountApi";
import { Token } from "models/Token";
import errorService from "services/errorService";
import tokenService from "services/tokenService";
import UserService from "services/userService";
import { User } from "models/User";

interface AccountState {
    user: User | null;
    token: Token | null;
    isAuthorized: boolean;
    isLoading: boolean;
    success: boolean;
    errors: string[];
}

const token = tokenService.getToken();

if (token) {
    authorizeClient(token.accessToken);
}

const initialState: AccountState = {
    token: token,
    user: token ? UserService.getUserFromToken(token) : null,
    isAuthorized: token !== null,
    isLoading: false,
    success: false,
    errors: [],
};

const login = createAsyncThunk(
    "account/login",
    async (payload: { username: string; password: string }, thunkApi) => {
        try {
            const token = await accountApi.login(
                payload.username,
                payload.password
            );
            return token;
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const register = createAsyncThunk(
    "account/register",
    async (
        payload: { username: string; email: string; password: string },
        thunkApi
    ) => {
        try {
            await accountApi.register(
                payload.username,
                payload.email,
                payload.password
            );
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const accountSlice = createSlice({
    name: "account",
    initialState: initialState,
    reducers: {
        logout(state) {
            state.isAuthorized = false;
            state.success = false;
            state.token = null;
            state.user = null;
            tokenService.removeToken();
            removeAuthorization();
        },
        clearErrors(state) {
            state.errors = [];
            state.success = false;
        },
    },
    extraReducers: {
        [login.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [login.fulfilled.type]: (state, action: PayloadAction<Token>) => {
            state.isLoading = false;
            state.token = action.payload;
            state.user = UserService.getUserFromToken(action.payload);
            state.isAuthorized = true;
            tokenService.save(state.token);
            authorizeClient(state.token.accessToken);
        },
        [login.rejected.type]: (state, action: PayloadAction<string[]>) => {
            state.isLoading = false;
            state.errors = action.payload;
            state.user = null;
            state.token = null;
        },
        [register.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [register.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.success = true;
        },
        [register.rejected.type]: (state, action: PayloadAction<string[]>) => {
            state.isLoading = false;
            state.errors = action.payload;
        },
    },
});

export const accountActions = {
    ...accountSlice.actions,
    login,
    register,
};

export default accountSlice.reducer;
