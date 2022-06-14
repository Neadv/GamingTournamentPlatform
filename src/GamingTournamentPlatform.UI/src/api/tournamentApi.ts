import { Tournament } from "models/tournaments/Tournament";
import { TournamentApplication } from "models/tournaments/TournamentApplication";
import { CreateTournamentApplicationDTO } from "models/tournaments/CreateTournamentApplicationDTO";
import { TournamentDetails } from "models/tournaments/TournamentDetails";
import api from ".";
import { UpdateRoundDTO } from "models/tournaments/UpdateRoundDTO";
import { TournamentRound } from "models/tournaments/TournamentRound";

function createTournament(tournament: Tournament): Promise<number> {
    return api.post("tournament", tournament).then((r) => r.data);
}

function updateTournament(tournament: Tournament): Promise<void> {
    return api.put("tournament/" + tournament.id, tournament);
}

function getTournamentById(id: number): Promise<Tournament> {
    return api.get("tournament/" + id).then((r) => r.data);
}

function getTournaments(): Promise<Tournament[]> {
    return api.get("tournament").then((r) => r.data);
}

function getTournamentDetailsById(id: number): Promise<TournamentDetails> {
    return api.get(`tournament/${id}/details`).then((r) => r.data);
}

function updateRegistrationInfo(
    tournamentId: number,
    countOfParticipants: number,
    registrationDeadline: string
): Promise<void> {
    return api.put(`tournament/${tournamentId}/register`, {
        tournamentId,
        countOfParticipants,
        registrationDeadline,
    });
}

function startRegistration(tournamentId: number): Promise<void> {
    return api.post(`tournament/${tournamentId}/register`);
}

function finishRegistration(tournamentId: number): Promise<void> {
    return api.post(`tournament/${tournamentId}/register/finish`);
}

function getApplications(
    tournamentId: number
): Promise<TournamentApplication[]> {
    return api
        .get(`tournament/${tournamentId}/application`)
        .then((r) => r.data);
}

function makeApplication(
    application: CreateTournamentApplicationDTO
): Promise<void> {
    return api.post("tournament/invite", application);
}

function acceptApplication(
    tournamentId: number,
    applicationId: number
): Promise<void> {
    return api.post(`tournament/${tournamentId}/application/${applicationId}`);
}

function updateRound(round: UpdateRoundDTO): Promise<void> {
    return api.put(
        `tournament/${round.tournamentId}/round/${round.roundId}`,
        round
    );
}

function startTournament(tournamentId: number): Promise<void> {
    return api.post(`tournament/${tournamentId}/start`);
}

function getTournamentRound(
    tournamentId: number,
    roundId: number
): Promise<TournamentRound> {
    return api
        .get(`tournament/${tournamentId}/round/${roundId}`)
        .then((r) => r.data);
}

function startTournamentRound(
    tournamentId: number,
    roundId: number
): Promise<void> {
    return api.post(`tournament/${tournamentId}/round/${roundId}/start`);
}

function finishTournamentRound(
    tournamentId: number,
    roundId: number,
    firstParticipantWon: boolean
): Promise<void> {
    return api.post(`tournament/${tournamentId}/round/${roundId}/finish`, {
        tournamentId,
        roundId,
        firstParticipantWon,
    });
}

export default {
    createTournament,
    updateTournament,
    getTournamentById,
    getTournamentDetailsById,
    updateRegistrationInfo,
    startRegistration,
    finishRegistration,
    getApplications,
    makeApplication,
    acceptApplication,
    updateRound,
    startTournament,
    getTournamentRound,
    startTournamentRound,
    finishTournamentRound,
    getTournaments,
};
