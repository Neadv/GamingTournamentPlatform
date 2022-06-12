import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Category } from "models/Category";
import React, { FC, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { categoryActions } from "store/reducers/categorySlice";
import { getCategories } from "store/selectors/categorySelectors";
import * as Yup from "yup";

interface CategoryEditorProps {
    category: Category;
    save: (category: Category) => void;
    saveButtonText: string;
}

const CategoryEditor: FC<CategoryEditorProps> = ({
    category,
    save,
    saveButtonText,
}) => {
    const formik = useFormik({
        initialValues: {
            ...category,
        },
        onSubmit: save,
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Name must be at least 3 characters")
                .required("Required"),
            description: Yup.string().required("Required"),
        }),
    });

    const categories = useAppSelector((s) => getCategories(s.category));
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
                    placeholder="Enter category name"
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
                    as="textarea"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter category description"
                />
                {formik.touched.description && formik.errors.description && (
                    <Form.Text className="text-danger">
                        {formik.errors.description}
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check
                    id="allowCreatingTeams"
                    name="allowCreatingTeams"
                    type="checkbox"
                    checked={formik.values.allowCreatingTeams}
                    onChange={formik.handleChange}
                    label="Allow Creating Teams"
                />
                {formik.touched.allowCreatingTeams &&
                    formik.errors.allowCreatingTeams && (
                        <Form.Text className="text-danger">
                            {formik.errors.allowCreatingTeams}
                        </Form.Text>
                    )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check
                    id="allowOrganizeCompetitions"
                    name="allowOrganizeCompetitions"
                    type="checkbox"
                    checked={formik.values.allowOrganizeCompetitions}
                    onChange={formik.handleChange}
                    label="Allow Organize Competitions"
                />
                {formik.touched.allowOrganizeCompetitions &&
                    formik.errors.allowOrganizeCompetitions && (
                        <Form.Text className="text-danger">
                            {formik.errors.allowOrganizeCompetitions}
                        </Form.Text>
                    )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="parentId">Parent:</Form.Label>
                <Form.Control
                    as="select"
                    id="parentId"
                    name="parentId"
                    value={formik.values.parentId ?? "-1"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value={"-1"} disabled>
                        Select category
                    </option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </Form.Control>
                {formik.touched.parentId && formik.errors.parentId && (
                    <Form.Text className="text-danger">
                        {formik.errors.parentId}
                    </Form.Text>
                )}
            </Form.Group>
            <Button type="submit" className="float-end">
                {saveButtonText}
            </Button>
        </Form>
    );
};

export default CategoryEditor;
