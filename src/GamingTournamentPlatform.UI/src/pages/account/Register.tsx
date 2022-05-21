import React, { FC, useEffect } from "react";
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

    return isAuthorized ? (
        <Navigate to={Routes.Home} />
    ) : (
        <RegisterForm
            isLoading={isLoading}
            errors={errors}
            register={(username, email, password) =>
                appDispatch(
                    accountActions.register({ username, email, password })
                )
            }
        />
    );
};

export default Register;
