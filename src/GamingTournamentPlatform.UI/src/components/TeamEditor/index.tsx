import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Team } from "models/Team";
import React, { FC, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { categoryActions } from "store/reducers/categorySlice";
import { getTeamCategories } from "store/selectors/categorySelectors";
import * as Yup from "yup";

interface TeamEditorProps {
    team: Team;
    save: (team: Team) => void;
    saveButtonText: string;
}

const TeamEditor: FC<TeamEditorProps> = ({ team, save, saveButtonText }) => {
    const formik = useFormik({
        initialValues: {
            ...team,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(6, "Name must be at least 6 characters")
                .required("Required"),
            description: Yup.string()
                .min(10, "Min 10 length")
                .required("Required"),
            categoryId: Yup.number().min(1, "Required").required(),
        }),
        onSubmit: save,
    });

    const categories = useAppSelector((s) => getTeamCategories(s.category));
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(categoryActions.loadCategories());
    }, []);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Name:</Form.Label>
                <Form.Control
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter team name"
                />
                {formik.touched.name && formik.errors.name && (
                    <Form.Text className="text-danger">
                        {formik.errors.name}
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description:</Form.Label>
                <Form.Control
                    id="description"
                    name="description"
                    as="textarea"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter team description..."
                />
                {formik.touched.description && formik.errors.description && (
                    <Form.Text className="text-danger">
                        {formik.errors.description}
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Category:</Form.Label>
                <Form.Control
                    as="select"
                    id="categoryId"
                    name="categoryId"
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value={0} disabled>
                        Select tournament category
                    </option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </Form.Control>
                {formik.touched.categoryId && formik.errors.categoryId && (
                    <Form.Text className="text-danger">
                        {formik.errors.categoryId}
                    </Form.Text>
                )}
            </Form.Group>
            <Button type="submit" className="float-end">
                {saveButtonText}
            </Button>
        </Form>
    );
};

export default TeamEditor;
