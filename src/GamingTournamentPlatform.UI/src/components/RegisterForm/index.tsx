import React, { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import ErrorAlert from "../ErrorAlert";
import { Link } from "react-router-dom";
import { Routes } from "router/Routes";

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
        <Form onSubmit={formik.handleSubmit}>
            <ErrorAlert errors={errors} />
            <Form.Group className="mb-3">
                <Form.Label htmlFor="username">Username:</Form.Label>
                <Form.Control
                    id="username"
                    name="username"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder="Please enter your username"
                />
                {formik.touched.username && formik.errors.username ? (
                    <Form.Text className="text-danger">
                        {formik.errors.username}
                    </Form.Text>
                ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Email:</Form.Label>
                <Form.Control
                    id="email"
                    name="email"
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="Please enter your email"
                />
                {formik.touched.email && formik.errors.email ? (
                    <Form.Text className="text-danger">
                        {formik.errors.email}
                    </Form.Text>
                ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password:</Form.Label>
                <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Please enter your password"
                />
                {formik.touched.password && formik.errors.password ? (
                    <Form.Text className="text-danger">
                        {formik.errors.password}
                    </Form.Text>
                ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="passwordConfirmation">
                    Confirm password:
                </Form.Label>
                <Form.Control
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirmation}
                    placeholder="Confirm your password"
                />
                {formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation ? (
                    <Form.Text className="text-danger">
                        {formik.errors.passwordConfirmation}
                    </Form.Text>
                ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Text>Do you already have an account? </Form.Text>
                <Link to={Routes.Login}>Sign in!</Link>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading}>
                Register
            </Button>
        </Form>
    );
};

export default RegisterForm;
