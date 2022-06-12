import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import teamApi from "api/teamApi";
import { AxiosError } from "axios";
import { Team } from "models/Team";
import errorService from "services/errorService";

interface TeamState {
    teams: Team[];
    team: Team | null;
    isLoading: boolean;
    errors: string[];
}

const initialState: TeamState = {
    teams: [],
    team: null,
    isLoading: false,
    errors: [],
};

const loadTeams = createAsyncThunk("team/loadTeams", async (_, thunkApi) => {
    try {
        const teams = await teamApi.loadTeams();
        return teams;
    } catch (e) {
        const error = e as AxiosError;
        thunkApi.rejectWithValue(errorService.getErrorMessagesFromError(error));
    }
});

const loadTeamsByCategoryId = createAsyncThunk(
    "team/loadTeamsByCategoryId",
    async (categoryId: number, thunkApi) => {
        try {
            const teams = await teamApi.loadTeamByCategoryId(categoryId);
            return teams;
        } catch (e) {
            const error = e as AxiosError;
            thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const loadTeamById = createAsyncThunk(
    "team/loadTeamById",
    async (id: number, thunkApi) => {
        try {
            const team = await teamApi.loadTeamById(id);
            return team;
        } catch (e) {
            const error = e as AxiosError;
            thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const teamSlice = createSlice({
    name: "team",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [loadTeams.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [loadTeams.fulfilled.type]: (state, payload: PayloadAction<Team[]>) => {
            state.isLoading = false;
            state.teams = payload.payload;
        },
        [loadTeams.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
        [loadTeamById.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [loadTeamById.fulfilled.type]: (
            state,
            payload: PayloadAction<Team>
        ) => {
            state.isLoading = false;
            state.team = payload.payload;
        },
        [loadTeamById.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
        [loadTeamsByCategoryId.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [loadTeamsByCategoryId.fulfilled.type]: (
            state,
            payload: PayloadAction<Team[]>
        ) => {
            state.isLoading = false;
            state.teams = payload.payload;
        },
        [loadTeamsByCategoryId.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
    },
});

export const teamActions = {
    ...teamSlice.actions,
    loadTeams,
    loadTeamsByCategoryId,
    loadTeamById,
};

export default teamSlice.reducer;
