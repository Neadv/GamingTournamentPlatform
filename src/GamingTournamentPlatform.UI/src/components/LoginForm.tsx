import React, { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface LoginFormProps {
    login: (username: string, password: string) => void;
    isLoading?: boolean;
    errors?: string[];
}

const LoginForm: FC<LoginFormProps> = ({ login, isLoading, errors }) => {
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(4, "Must be 4 characters or more")
                .max(20, "Must be 20 characters or less")
                .required("Required"),
            password: Yup.string()
                .min(6, "Must be 6 characters or more")
                .max(40, "Must be 40 characters or less")
                .required("Required"),
        }),
        onSubmit: (values) => {
            login(values.username, values.password);
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            {errors && (
                <div>
                    {errors.map((e, i) => (
                        <div key={i}>{e}</div>
                    ))}
                </div>
            )}
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                {formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                {formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
            </div>

            <button type="submit" disabled={isLoading}>
                Log In
            </button>
        </form>
    );
};

export default LoginForm;
