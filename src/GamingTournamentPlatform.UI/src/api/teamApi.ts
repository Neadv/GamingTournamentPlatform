import { Team } from "models/Team";
import api from ".";

function loadTeams(): Promise<Team[]> {
    return api.get("team").then((res) => res.data);
}

function loadTeamById(id: number): Promise<Team> {
    return api.get("team/" + id).then((res) => res.data);
}

function loadTeamByCategoryId(categoryId: number): Promise<Team> {
    return api.get("team/category/" + categoryId).then((res) => res.data);
}

export default {
    loadTeams,
    loadTeamById,
    loadTeamByCategoryId,
};
