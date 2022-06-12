import React from "react";
import Login from "pages/Account/Login";
import Register from "pages/Account/Register";
import Error from "pages/Error";
import Home from "pages/Home";
import { Routes } from "./Routes";
import CreateTournament from "pages/Tournament/Create";
import CreateTeam from "pages/Team/Create";
import TeamInfo from "pages/Team/Info";
import TournamentRegistration from "pages/Tournament/Registration";
import TournamentInfo from "pages/Tournament/Info";
import CreateCategory from "pages/Category/Create";
import EditCategory from "pages/Category/Edit";

export interface Route {
    path: string;
    component: React.ComponentType;
    private: boolean;
    exact?: boolean;
    allowedRoles?: string[];
}

export const routes: Route[] = [
    {
        path: Routes.Home,
        component: Home,
        private: false,
        exact: true,
    },
    {
        path: Routes.Login,
        component: Login,
        private: false,
        exact: true,
    },
    {
        path: Routes.Register,
        component: Register,
        private: false,
        exact: true,
    },
    {
        path: Routes.Error + ":code",
        component: Error,
        private: false,
    },
    {
        path: Routes.CreateTournament,
        component: CreateTournament,
        private: true,
    },
    {
        path: Routes.TournamentRegistration + ":id",
        component: TournamentRegistration,
        private: true,
    },
    {
        path: Routes.TournamentInfo + ":id",
        component: TournamentInfo,
        private: true,
    },
    {
        path: Routes.CreateTeam,
        component: CreateTeam,
        private: true,
    },
    {
        path: Routes.TeamInfo + ":id",
        component: TeamInfo,
        private: true,
    },
    {
        path: Routes.CreateCategory,
        component: CreateCategory,
        private: true,
        allowedRoles: ["Admin"],
    },
    {
        path: Routes.EditCategory + ":id",
        component: EditCategory,
        private: true,
        allowedRoles: ["Admin"],
    },
];
