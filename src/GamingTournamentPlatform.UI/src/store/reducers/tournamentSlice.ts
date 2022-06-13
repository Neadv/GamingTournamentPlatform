import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import tournamentApi from "api/tournamentApi";
import { AxiosError } from "axios";
import { Tournament } from "models/tournaments/Tournament";
import { TournamentDetails } from "models/tournaments/TournamentDetails";
import errorService from "services/errorService";

interface TournamentState {
    tournaments: Tournament[];
    tournament: Tournament | null;
    tournamentDetails: TournamentDetails | null;
    isLoading: boolean;
    errors: string[];
    isSuccess: boolean;
}

const initialState: TournamentState = {
    tournaments: [],
    tournament: null,
    tournamentDetails: null,
    isLoading: false,
    errors: [],
    isSuccess: false,
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
    },
});

export const tournamentActions = {
    ...tournamentSlice.actions,
    createTournament,
    loadTournamentById,
    updateTournament,
};

export default tournamentSlice.reducer;
