import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import teamApi from "api/teamApi";
import tournamentApi from "api/tournamentApi";
import { AxiosError } from "axios";
import { Team } from "models/Team";
import { TeamUserApplication } from "models/TeamUserApplication";
import { TournamentApplication } from "models/tournaments/TournamentApplication";
import errorService from "services/errorService";

interface TeamState {
    teams: Team[];
    team: Team | null;
    applications: TeamUserApplication[];
    isLoading: boolean;
    errors: string[];
    tournamentApplications: TournamentApplication[];
}

const initialState: TeamState = {
    teams: [],
    team: null,
    applications: [],
    isLoading: false,
    errors: [],
    tournamentApplications: [],
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

const loadTeamApplication = createAsyncThunk(
    "team/loadTeamApplication",
    async (teamId: number, thunkApi) => {
        try {
            const application = await teamApi.getApplications(teamId);
            return application;
        } catch (e) {
            const error = e as AxiosError;
            thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

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

const createTeam = createAsyncThunk(
    "team/createTeam",
    async (team: Team, thunkApi) => {
        try {
            await teamApi.createTeam(team);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const updateTeam = createAsyncThunk(
    "team/updateTeam",
    async (team: Team, thunkApi) => {
        try {
            await teamApi.updateTeam(team);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const sendApplication = createAsyncThunk(
    "team/sendApplication",
    async (application: Omit<TeamUserApplication, "id">, thunkApi) => {
        try {
            await teamApi.makeApplication(application);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const acceptApplication = createAsyncThunk(
    "team/acceptApplication",
    async (payload: { teamId: number; applicationId: number }, thunkApi) => {
        try {
            await teamApi.acceptApplication(
                payload.teamId,
                payload.applicationId
            );
            return payload.applicationId;
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const loadTournamentApplication = createAsyncThunk(
    "team/loadTournamentApplication",
    async (teamId: number, thunkApi) => {
        try {
            const applications = await teamApi.getTournamentApplication(teamId);
            return applications;
        } catch (e) {
            const error = e as AxiosError;
            thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const acceptTournamentApplication = createAsyncThunk(
    "team/acceptTournamentApplication",
    async (application: TournamentApplication, thunkApi) => {
        try {
            if (application.tournament) {
                await tournamentApi.acceptApplication(
                    application.tournament?.id,
                    application.id
                );
            }
            return application.id;
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
    reducers: {
        createNewTeam: (state) => {
            state.team = {
                id: 0,
                name: "",
                description: "",
                categoryId: 0,
                leaderId: 0,
                participants: [],
            };
        },
    },
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
        [loadTeamApplication.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [loadTeamApplication.fulfilled.type]: (
            state,
            payload: PayloadAction<TeamUserApplication[]>
        ) => {
            state.isLoading = false;
            state.applications = payload.payload;
        },
        [loadTeamApplication.rejected.type]: (
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
        [createTeam.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [createTeam.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [createTeam.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
        [updateTeam.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [updateTeam.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [updateTeam.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
        [sendApplication.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [sendApplication.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [sendApplication.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
        [acceptApplication.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [acceptApplication.fulfilled.type]: (
            state,
            payload: PayloadAction<number>
        ) => {
            state.isLoading = false;
            state.applications = state.applications.filter(
                (a) => a.id !== payload.payload
            );
        },
        [acceptApplication.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
        [loadTournamentApplication.fulfilled.type]: (
            state,
            payload: PayloadAction<TournamentApplication[]>
        ) => {
            state.isLoading = false;
            state.tournamentApplications = payload.payload;
        },
        [acceptTournamentApplication.fulfilled.type]: (
            state,
            payload: PayloadAction<number>
        ) => {
            state.isLoading = false;
            state.tournamentApplications = state.tournamentApplications.filter(
                (t) => t.id !== payload.payload
            );
        },
    },
});

export const teamActions = {
    ...teamSlice.actions,
    loadTeams,
    loadTeamsByCategoryId,
    loadTeamById,
    createTeam,
    updateTeam,
    sendApplication,
    loadTeamApplication,
    acceptApplication,
    loadTournamentApplication,
    acceptTournamentApplication,
};

export default teamSlice.reducer;
