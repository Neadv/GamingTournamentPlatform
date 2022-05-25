import React, { FC } from "react";

interface AppIconProps {
    icon: string;
    bi?: boolean;
    large?: boolean;
    color?: string;
}

const AppIcon: FC<AppIconProps> = ({
    icon,
    large,
    bi = true,
    color = "#fff",
}) => {
    let prefix = "";
    if (bi) prefix = "bi";

    let fontSize = "1rem";
    if (large) fontSize = "2rem";

    return (
        <i
            className={`${prefix}${prefix ? "-" : null}${icon}`}
            style={{ fontSize: fontSize, color: color }}
        ></i>
    );
};

export default AppIcon;
