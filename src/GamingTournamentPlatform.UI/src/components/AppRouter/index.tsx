import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "hooks/redux";
import { Route as AppRoute, routes } from "router";
import { Routes as RouteNames } from "router/Routes";

const AppRouter: FC = () => {
    const { isAuthorized } = useAppSelector((s) => s.account);

    const checkRoute = (route: AppRoute) => {
        return !route.private || (route.private && isAuthorized);
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
                element={<Navigate to={RouteNames.Error + "404"} />}
            />
        </Routes>
    );
};

export default AppRouter;
