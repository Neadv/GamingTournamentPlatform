import React, { FC } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Routes } from "router/Routes";
import { NavLink } from "react-router-dom";
import logo from "assets/images/Logo.png";
import "./AppHeader.scss";
import UserBadge from "components/UserBadge";
import { useAppSelector } from "hooks/redux";

const AppHeader: FC = () => {
    const { user, isAuthorized } = useAppSelector((s) => s.account);
    const isAdmin = user?.roles.includes("Admin") === true;

    return (
        <header id="header">
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand as={NavLink} to={Routes.Home}>
                        <img className="header-logo" src={logo} />
                        Gaming Tournament
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <NavDropdown
                                title="Tournaments"
                                id="navbarScrollingDropdown"
                                menuVariant="dark"
                            >
                                {isAuthorized && (
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to={Routes.CreateTournament}
                                    >
                                        Create new Tournament
                                    </NavDropdown.Item>
                                )}
                                <NavDropdown.Item
                                    as={NavLink}
                                    to={Routes.TournamentList}
                                >
                                    Tournaments
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                title="Teams"
                                id="navbarScrollingDropdown"
                                menuVariant="dark"
                            >
                                {isAuthorized && (
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to={Routes.CreateTeam}
                                    >
                                        Create new Team
                                    </NavDropdown.Item>
                                )}
                                <NavDropdown.Item
                                    as={NavLink}
                                    to={Routes.TeamList}
                                >
                                    Teams
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown
                                title="Categories"
                                id="navbarScrollingDropdown"
                                menuVariant="dark"
                            >
                                {isAdmin && (
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to={Routes.CreateCategory}
                                    >
                                        Create new Category
                                    </NavDropdown.Item>
                                )}
                                <NavDropdown.Item
                                    as={NavLink}
                                    to={Routes.CategoryList}
                                >
                                    Categories
                                </NavDropdown.Item>
                            </NavDropdown>
                            {isAdmin && (
                                <NavDropdown
                                    title="Users"
                                    id="navbarScrollingDropdown"
                                    menuVariant="dark"
                                >
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to={Routes.CreateCategory}
                                    >
                                        Users
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                        <UserBadge />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default AppHeader;
