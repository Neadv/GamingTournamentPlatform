import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import tournamentApi from "api/tournamentApi";
import { AxiosError } from "axios";
import { Tournament } from "models/tournaments/Tournament";
import { TournamentApplication } from "models/tournaments/TournamentApplication";
import { CreateTournamentApplicationDTO } from "models/tournaments/CreateTournamentApplicationDTO";
import {
    TournamentDetails,
    TournamentState as State,
} from "models/tournaments/TournamentDetails";
import errorService from "services/errorService";
import { UpdateRoundDTO } from "models/tournaments/UpdateRoundDTO";
import { TournamentRound } from "models/tournaments/TournamentRound";

interface TournamentState {
    tournaments: Tournament[];
    tournament: Tournament | null;
    tournamentDetails: TournamentDetails | null;
    isLoading: boolean;
    errors: string[];
    isSuccess: boolean;
    applications: TournamentApplication[];
    tournamentRound: TournamentRound | null;
}

const initialState: TournamentState = {
    tournaments: [],
    tournament: null,
    tournamentDetails: null,
    isLoading: false,
    errors: [],
    isSuccess: false,
    applications: [],
    tournamentRound: null,
};

const createTournament = createAsyncThunk(
    "tournament/createTournament",
    async (tournament: Tournament, thunkApi) => {
        try {
            return await tournamentApi.createTournament(tournament);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const updateTournament = createAsyncThunk(
    "tournament/updateTournament",
    async (tournament: Tournament, thunkApi) => {
        try {
            await tournamentApi.updateTournament(tournament);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const updateTournamentRegistration = createAsyncThunk(
    "tournament/updateTournamentRegistration",
    async (
        value: {
            tournamentId: number;
            countOfParticipants: number;
            registrationDeadline: string;
        },
        thunkApi
    ) => {
        try {
            await tournamentApi.updateRegistrationInfo(
                value.tournamentId,
                value.countOfParticipants,
                value.registrationDeadline
            );
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const loadTournamentById = createAsyncThunk(
    "tournament/loadTournamentById",
    async (tournamentId: number, thunkApi) => {
        try {
            return await tournamentApi.getTournamentById(tournamentId);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const loadTournaments = createAsyncThunk(
    "tournament/loadTournaments",
    async (_, thunkApi) => {
        try {
            return await tournamentApi.getTournaments();
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const loadTournamentDetailsById = createAsyncThunk(
    "tournament/loadTournamentDetailsById",
    async (tournamentId: number, thunkApi) => {
        try {
            return await tournamentApi.getTournamentDetailsById(tournamentId);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const startRegistration = createAsyncThunk(
    "tournament/startRegistration",
    async (tournamentId: number, thunkApi) => {
        try {
            await tournamentApi.startRegistration(tournamentId);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const finishRegistration = createAsyncThunk(
    "tournament/finishRegistration",
    async (tournamentId: number, thunkApi) => {
        try {
            await tournamentApi.finishRegistration(tournamentId);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const startTournament = createAsyncThunk(
    "tournament/startTournament",
    async (tournamentId: number, thunkApi) => {
        try {
            await tournamentApi.startTournament(tournamentId);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const loadTournamentApplicationsById = createAsyncThunk(
    "tournament/loadTournamentApplicationsById",
    async (tournamentId: number, thunkApi) => {
        try {
            return await tournamentApi.getApplications(tournamentId);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const makeApplication = createAsyncThunk(
    "tournament/makeApplication",
    async (application: CreateTournamentApplicationDTO, thunkApi) => {
        try {
            await tournamentApi.makeApplication(application);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const acceptApplication = createAsyncThunk(
    "tournament/acceptApplication",
    async (
        payload: { tournamentId: number; applicationId: number },
        thunkApi
    ) => {
        try {
            await tournamentApi.acceptApplication(
                payload.tournamentId,
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

const updateRound = createAsyncThunk(
    "tournament/updateRound",
    async (payload: UpdateRoundDTO, thunkApi) => {
        try {
            await tournamentApi.updateRound(payload);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const loadTournamentRoundById = createAsyncThunk(
    "tournament/loadTournamentRoundById",
    async (value: { tournamentId: number; roundId: number }, thunkApi) => {
        try {
            return await tournamentApi.getTournamentRound(
                value.tournamentId,
                value.roundId
            );
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const startRound = createAsyncThunk(
    "tournament/startRound",
    async (value: { tournamentId: number; roundId: number }, thunkApi) => {
        try {
            await tournamentApi.startTournamentRound(
                value.tournamentId,
                value.roundId
            );
            thunkApi.dispatch(loadTournamentDetailsById(value.tournamentId));
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const finishRound = createAsyncThunk(
    "tournament/finishRound",
    async (
        value: {
            tournamentId: number;
            roundId: number;
            firstParticipantWon: boolean;
        },
        thunkApi
    ) => {
        try {
            await tournamentApi.finishTournamentRound(
                value.tournamentId,
                value.roundId,
                value.firstParticipantWon
            );
            thunkApi.dispatch(loadTournamentDetailsById(value.tournamentId));
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const tournamentSlice = createSlice({
    name: "tournament",
    initialState: initialState,
    reducers: {
        createNewTournament: (state) => {
            state.tournament = {
                id: 0,
                title: "",
                description: "",
                state: -1,
                type: -1,
                registrationDeadline: new Date().toISOString(),
                isPublic: false,
                categoryId: -1,
                organizerId: -1,
            };
        },
        clear: (state) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.errors = [];
        },
    },
    extraReducers: {
        [createTournament.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [createTournament.fulfilled.type]: (
            state,
            action: PayloadAction<number>
        ) => {
            state.isLoading = false;
            state.isSuccess = true;
            if (state.tournament) state.tournament.id = action.payload;
        },
        [createTournament.rejected.type]: (
            state,
            action: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = action.payload;
            state.isSuccess = false;
        },
        [updateTournament.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [updateTournament.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [updateTournament.rejected.type]: (
            state,
            action: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = action.payload;
            state.isSuccess = false;
        },
        [loadTournamentById.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [loadTournamentById.fulfilled.type]: (
            state,
            action: PayloadAction<Tournament>
        ) => {
            state.isLoading = false;
            state.tournament = action.payload;
        },
        [loadTournamentById.rejected.type]: (
            state,
            action: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = action.payload;
        },
        [loadTournamentDetailsById.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [loadTournamentDetailsById.fulfilled.type]: (
            state,
            action: PayloadAction<TournamentDetails>
        ) => {
            state.isLoading = false;
            state.tournamentDetails = action.payload;
        },
        [loadTournamentDetailsById.rejected.type]: (
            state,
            action: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = action.payload;
        },
        [startRegistration.fulfilled.type]: (state) => {
            if (state.tournamentDetails) {
                state.tournamentDetails.state = State.Registration;
            }
        },
        [finishRegistration.fulfilled.type]: (state) => {
            if (state.tournamentDetails) {
                state.tournamentDetails.state = State.NotStarted;
            }
        },
        [startTournament.fulfilled.type]: (state) => {
            if (state.tournamentDetails) {
                state.tournamentDetails.state = State.InProgress;
            }
        },
        [loadTournamentApplicationsById.fulfilled.type]: (
            state,
            action: PayloadAction<TournamentApplication[]>
        ) => {
            state.applications = action.payload;
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
        [loadTournamentRoundById.fulfilled.type]: (
            state,
            payload: PayloadAction<TournamentRound>
        ) => {
            state.isLoading = false;
            state.tournamentRound = payload.payload;
        },
        [updateRound.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.isSuccess = true;
        },
        [loadTournaments.fulfilled.type]: (
            state,
            action: PayloadAction<Tournament[]>
        ) => {
            state.isLoading = false;
            state.tournaments = action.payload;
        },
    },
});

export const tournamentActions = {
    ...tournamentSlice.actions,
    createTournament,
    loadTournamentById,
    updateTournament,
    loadTournamentDetailsById,
    updateTournamentRegistration,
    startRegistration,
    finishRegistration,
    loadTournamentApplicationsById,
    makeApplication,
    acceptApplication,
    updateRound,
    startTournament,
    loadTournamentRoundById,
    startRound,
    finishRound,
    loadTournaments,
};

export default tournamentSlice.reducer;
