import React, { FC } from "react";
import { useParams } from "react-router-dom";

const Error: FC = () => {
    const { code } = useParams();
    return code ? <div>Error: {code}</div> : null;
};

export default Error;
