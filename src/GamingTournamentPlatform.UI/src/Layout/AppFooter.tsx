import React, { FC } from "react";
import "./AppFooter.scss";

const AppFooter: FC = () => {
    return (
        <footer id="footer">
            <div className="footer-text">
                © Copyright {new Date().getFullYear()} Vladislav Krinistkiy |
                Gaming Tournament Platform | Version{" "}
                {process.env.REACT_APP_VERSION}
            </div>
        </footer>
    );
};

export default AppFooter;
