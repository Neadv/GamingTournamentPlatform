import React, { FC } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "../router/Routes";
import ErrorAlert from "./ErrorAlert";

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
                    placeholder="Please enter your username or email"
                />
                {formik.touched.username && formik.errors.username ? (
                    <Form.Text className="text-danger">
                        {formik.errors.username}
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
                <Form.Text>Don&apos;t have an account? </Form.Text>
                <Link to={Routes.Register}>Create one!</Link>
            </Form.Group>

            <Button type="submit" disabled={isLoading}>
                Log In
            </Button>
        </Form>
    );
};

export default LoginForm;
