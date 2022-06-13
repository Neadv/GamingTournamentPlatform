import React, { FC } from "react";
import { Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { accountActions } from "store/reducers/accountSlice";
import { Routes } from "router/Routes";
import { Link, useNavigate } from "react-router-dom";
import AppIcon from "../AppIcon";

const UserBadge: FC = () => {
    const { isAuthorized, user } = useAppSelector((s) => s.account);
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = () => {
        appDispatch(accountActions.logout());
        navigate(Routes.Login);
    };

    return !isAuthorized ? (
        <Link to={Routes.Login} className="btn btn-outline-light">
            Log In
        </Link>
    ) : (
        <div className="d-flex align-items-center">
            <div className="me-2" style={{ lineHeight: "1rem" }}>
                <div className="text-white">Hi, {user?.userName}</div>
                <div className="text-secondary">{user?.email}</div>
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                    <AppIcon icon="person-circle" large />
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark" style={{ left: "-150%" }}>
                    <Dropdown.Item as={Link} to={Routes.User + user?.id}>
                        Information
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={Routes.UserTeamApplications}>
                        Team Application
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to={Routes.UserTournamentsApplications}
                    >
                        Application
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default UserBadge;
