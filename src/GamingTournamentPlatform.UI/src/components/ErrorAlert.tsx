import React, { FC } from "react";
import { Alert } from "react-bootstrap";

interface ErrorAlertProps {
    errors?: string[];
}

const ErrorAlert: FC<ErrorAlertProps> = ({ errors }) => {
    return errors?.length ? (
        <Alert variant="danger">
            <ul className="mb-0">
                {errors.map((e, i) => (
                    <li key={i}>{e}</li>
                ))}
            </ul>
        </Alert>
    ) : null;
};

export default ErrorAlert;
