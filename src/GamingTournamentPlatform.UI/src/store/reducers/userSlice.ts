import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import teamApi from "api/teamApi";
import userApi from "api/userApi";
import { AxiosError } from "axios";
import { TeamUserApplication } from "models/TeamUserApplication";
import { User } from "models/User";
import { UserDetails } from "models/UserDetails";
import errorService from "services/errorService";

interface UserState {
    users: User[];
    user: UserDetails | null;
    isLoading: boolean;
    errors: string[];
    teamApplications: TeamUserApplication[];
}

const initialState: UserState = {
    users: [],
    user: null,
    isLoading: false,
    errors: [],
    teamApplications: [],
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

const loadTeamApplication = createAsyncThunk(
    "user/loadTeamApplication",
    async (_, thunkApi) => {
        try {
            const applications = await userApi.loadUserTeamApplication();
            return applications;
        } catch (e) {
            const error = e as AxiosError;
            thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const acceptTeamApplication = createAsyncThunk(
    "user/acceptTeamApplication",
    async (application: TeamUserApplication, thunkApi) => {
        try {
            await teamApi.acceptApplication(application.teamId, application.id);
            return application.id;
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
            payload: PayloadAction<UserDetails>
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
        [loadTeamApplication.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [loadTeamApplication.fulfilled.type]: (
            state,
            payload: PayloadAction<TeamUserApplication[]>
        ) => {
            state.isLoading = false;
            state.teamApplications = payload.payload;
        },
        [loadTeamApplication.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
        [acceptTeamApplication.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [acceptTeamApplication.fulfilled.type]: (
            state,
            payload: PayloadAction<number>
        ) => {
            state.isLoading = false;
            state.teamApplications = state.teamApplications.filter(
                (t) => t.id !== payload.payload
            );
        },
        [acceptTeamApplication.rejected.type]: (
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
    loadTeamApplication,
    acceptTeamApplication,
};

export default userSlice.reducer;
