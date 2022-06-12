import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "hooks/redux";
import { Route as AppRoute, routes } from "router";
import { Routes as RouteNames } from "router/Routes";

const AppRouter: FC = () => {
    const { isAuthorized, user } = useAppSelector((s) => s.account);

    const checkRoute = (route: AppRoute) => {
        return (
            !route.private ||
            (route.private && isAuthorized && !route.allowedRoles) ||
            (route.private &&
                isAuthorized &&
                route.allowedRoles &&
                route.allowedRoles.some((r) => user?.roles.includes(r)))
        );
    };

    return (
        <Routes>
            {routes
                .filter((r) => checkRoute(r))
                .map((r) => (
                    <Route
                        path={r.path}
                        element={<r.component />}
                        key={r.path}
                    />
                ))}
            <Route
                path="*"
                element={
                    <Navigate
                        to={
                            isAuthorized
                                ? RouteNames.Error + "404"
                                : RouteNames.Login
                        }
                    />
                }
            />
        </Routes>
    );
};

export default AppRouter;
