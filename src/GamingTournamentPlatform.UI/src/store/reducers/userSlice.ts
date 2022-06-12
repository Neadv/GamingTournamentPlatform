import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import { AxiosError } from "axios";
import { User } from "models/User";
import errorService from "services/errorService";

interface UserState {
    users: User[];
    user: User | null;
    isLoading: boolean;
    errors: string[];
}

const initialState: UserState = {
    users: [],
    user: null,
    isLoading: false,
    errors: [],
};

const loadUsers = createAsyncThunk("user/loadUsers", async (_, thunkApi) => {
    try {
        const users = await userApi.loadUsers();
        return users;
    } catch (e) {
        const error = e as AxiosError;
        thunkApi.rejectWithValue(errorService.getErrorMessagesFromError(error));
    }
});

const loadUserById = createAsyncThunk(
    "user/loadUserById",
    async (id: number, thunkApi) => {
        try {
            const user = await userApi.loadUserById(id);
            return user;
        } catch (e) {
            const error = e as AxiosError;
            thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [loadUsers.pending.type]: (state) => {
            state.isLoading = false;
            state.errors = [];
        },
        [loadUsers.fulfilled.type]: (state, payload: PayloadAction<User[]>) => {
            state.users = payload.payload;
            state.isLoading = false;
        },
        [loadUsers.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
        [loadUserById.pending.type]: (state) => {
            state.isLoading = false;
            state.errors = [];
        },
        [loadUserById.fulfilled.type]: (
            state,
            payload: PayloadAction<User>
        ) => {
            state.user = payload.payload;
            state.isLoading = false;
        },
        [loadUserById.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
    },
});

export const userActions = {
    ...userSlice.actions,
    loadUsers,
    loadUserById,
};

export default userSlice.reducer;
