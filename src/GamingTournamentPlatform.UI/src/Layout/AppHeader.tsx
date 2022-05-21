import React, { FC } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Routes } from "../router/Routes";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import "./AppHeader.scss";
import UserBadge from "../components/UserBadge";

const AppHeader: FC = () => {
    return (
        <header id="header">
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand as={NavLink} to={Routes.Home}>
                        <img className="header-logo" src={logo} />
                        Gaming Tournament Platform
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link as={NavLink} to="/test2">
                                Link
                            </Nav.Link>
                            <NavDropdown
                                title="Link"
                                id="navbarScrollingDropdown"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item as={NavLink} to="/test3">
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/test4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={NavLink} to="/test5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={NavLink} to="/error/404">
                                Link
                            </Nav.Link>
                        </Nav>
                        <UserBadge />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default AppHeader;
