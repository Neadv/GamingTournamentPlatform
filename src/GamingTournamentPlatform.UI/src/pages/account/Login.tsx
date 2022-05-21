import React, { FC } from "react";
import LoginForm from "../../components/LoginForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Navigate } from "react-router-dom";
import { Routes } from "../../router/Routes";
import { accountActions } from "../../store/reducers/accountSlice";

const Login: FC = () => {
    const { isAuthorized, isLoading, errors } = useAppSelector(
        (s) => s.account
    );
    const appDispatch = useAppDispatch();

    return isAuthorized ? (
        <Navigate to={Routes.Home} />
    ) : (
        <LoginForm
            isLoading={isLoading}
            errors={errors}
            login={(username, password) =>
                appDispatch(accountActions.login({ username, password }))
            }
        />
    );
};

export default Login;
