import React from "react";
import Login from "pages/Account/Login";
import Register from "pages/Account/Register";
import Error from "pages/Error";
import Home from "pages/Home";
import { Routes } from "./Routes";

export interface Route {
    path: string;
    component: React.ComponentType;
    private: boolean;
    exact?: boolean;
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
];
