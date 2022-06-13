import { Tournament } from "models/tournaments/Tournament";
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

export default {
    createTournament,
    updateTournament,
    getTournamentById,
};
