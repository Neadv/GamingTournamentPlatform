import { Team } from "models/Team";
import { TeamUserApplication } from "models/TeamUserApplication";
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

function createTeam(team: Team): Promise<void> {
    return api.post("team", team);
}

function updateTeam(team: Team): Promise<void> {
    return api.put("team/" + team.id, team);
}

function getApplications(
    teamId: number,
    invitation: boolean
): Promise<TeamUserApplication[]> {
    return api
        .get(`team/${teamId}/application`, { params: { invitation } })
        .then((res) => res.data);
}

function acceptApplication(
    teamId: number,
    applicationId: number
): Promise<void> {
    return api.post(`team/${teamId}/application/${applicationId}`);
}

function makeApplication(
    application: Omit<TeamUserApplication, "id">
): Promise<void> {
    return api.post("team/invite", application);
}

export default {
    loadTeams,
    loadTeamById,
    loadTeamByCategoryId,
    createTeam,
    updateTeam,
    makeApplication,
    getApplications,
    acceptApplication,
};
