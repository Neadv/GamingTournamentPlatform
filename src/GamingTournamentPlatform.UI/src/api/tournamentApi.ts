import { Tournament } from "models/tournaments/Tournament";
import { TournamentApplication } from "models/tournaments/TournamentApplication";
import { CreateTournamentApplicationDTO } from "models/tournaments/CreateTournamentApplicationDTO";
import { TournamentDetails } from "models/tournaments/TournamentDetails";
import api from ".";

function createTournament(tournament: Tournament): Promise<number> {
    return api.post("tournament", tournament).then((r) => r.data);
}

function updateTournament(tournament: Tournament): Promise<void> {
    return api.put("tournament/" + tournament.id, tournament);
}

function getTournamentById(id: number): Promise<Tournament> {
    return api.get("tournament/" + id).then((r) => r.data);
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
};
