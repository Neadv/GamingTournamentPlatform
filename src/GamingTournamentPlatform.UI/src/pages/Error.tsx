import React, { FC } from "react";
import { useParams } from "react-router-dom";

const Error: FC = () => {
    const { code } = useParams();
    return <div>Error: {code}</div>;
};

export default Error;
