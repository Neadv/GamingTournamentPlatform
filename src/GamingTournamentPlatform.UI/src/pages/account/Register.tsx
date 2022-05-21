import React, { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Routes } from "../../router/Routes";
import { accountActions } from "../../store/reducers/accountSlice";

const Register: FC = () => {
    const { isAuthorized, isLoading, errors, success } = useAppSelector(
        (s) => s.account
    );
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            navigate(Routes.Login);
        }
    }, [success]);

    useEffect(() => {
        appDispatch(accountActions.clearErrors());
    }, []);

    return isAuthorized ? (
        <Navigate to={Routes.Home} />
    ) : (
        <Card>
            <Card.Body>
                <Card.Title>Account registration</Card.Title>
                <div className="mt-3">
                    <RegisterForm
                        isLoading={isLoading}
                        errors={errors}
                        register={(username, email, password) =>
                            appDispatch(
                                accountActions.register({
                                    username,
                                    email,
                                    password,
                                })
                            )
                        }
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default Register;
