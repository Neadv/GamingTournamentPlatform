import React, { FC } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { accountActions } from "../store/reducers/accountSlice";
import { Routes } from "../router/Routes";
import { Link, useNavigate } from "react-router-dom";

const UserBadge: FC = () => {
    const { isAuthorized, user } = useAppSelector((s) => s.account);
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = () => {
        appDispatch(accountActions.logout());
        navigate(Routes.Login);
    };

    return !isAuthorized ? (
        <Link to={Routes.Login} className="btn btn-secondary">
            Log In
        </Link>
    ) : (
        <div className="d-flex">
            <div>Hi, {user?.username}</div>
            <Button variant="secondary" onClick={logout}>
                Logout
            </Button>
        </div>
    );
};

export default UserBadge;
