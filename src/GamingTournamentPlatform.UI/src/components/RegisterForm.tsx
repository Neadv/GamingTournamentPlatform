import React, { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface RegisterFormProps {
    register: (username: string, email: string, password: string) => void;
    isLoading?: boolean;
    errors?: string[];
}

const RegisterForm: FC<RegisterFormProps> = ({
    register,
    isLoading,
    errors,
}) => {
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(4, "Must be 4 characters or more")
                .max(20, "Must be 20 characters or less")
                .required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string()
                .min(6, "Must be 6 characters or more")
                .max(40, "Must be 40 characters or less")
                .required("Required"),
            passwordConfirmation: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Required"),
        }),
        onSubmit: (values) => {
            register(values.username, values.email, values.password);
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
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
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
            <div>
                <label htmlFor="passwordConfirmation">Confirm password:</label>
                <input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
                />
                {formik.errors.passwordConfirmation ? (
                    <div>{formik.errors.passwordConfirmation}</div>
                ) : null}
            </div>

            <button type="submit" disabled={isLoading}>
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
