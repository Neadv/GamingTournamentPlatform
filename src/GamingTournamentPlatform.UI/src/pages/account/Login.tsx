import React, { FC, useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Navigate } from "react-router-dom";
import { Routes } from "../../router/Routes";
import { accountActions } from "../../store/reducers/accountSlice";
import { Card } from "react-bootstrap";

const Login: FC = () => {
    const { isAuthorized, isLoading, errors } = useAppSelector(
        (s) => s.account
    );
    const appDispatch = useAppDispatch();

    useEffect(() => {
        appDispatch(accountActions.clearErrors());
    }, []);

    return isAuthorized ? (
        <Navigate to={Routes.Home} />
    ) : (
        <Card>
            <Card.Body>
                <Card.Title>Login</Card.Title>
                <div className="mt-3">
                    <LoginForm
                        isLoading={isLoading}
                        errors={errors}
                        login={(username, password) =>
                            appDispatch(
                                accountActions.login({ username, password })
                            )
                        }
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default Login;
