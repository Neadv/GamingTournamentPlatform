import React, { FC } from "react";
import { Container } from "react-bootstrap";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import "./AppLayout.scss";

const AppLayout: FC = ({ children }) => {
    return (
        <div className="layout-container">
            <AppHeader />
            <main className="layout-content">
                <Container>{children}</Container>
            </main>
            <AppFooter />
        </div>
    );
};

export default AppLayout;
