import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { TournamentType } from "models/Tournament";
import React, { FC, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { enumToLookupArray } from "services/enumUtils";
import { categoryActions } from "store/reducers/categorySlice";
import { getTeamCategories } from "store/selectors/categorySelectors";
import * as Yup from "yup";

const TournamentEditor: FC = () => {
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            type: -1,
            categoryId: -1,
            registrationDeadline: new Date(),
            isPublic: true,
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(6, "Title must be at least 6 characters")
                .max(50, "Title must be at most 50 characters")
                .required("Title is required"),
            description: Yup.string().required("Description is required"),
            type: Yup.number().min(0, "Required").required("Required"),
            categoryId: Yup.number().min(0, "Required").required("Required"),
            registrationDeadline: Yup.date().required("Required"),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values));
        },
    });

    const tournamentTypes = enumToLookupArray(TournamentType);

    const categories = useAppSelector((s) => getTeamCategories(s.category));
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(categoryActions.loadCategories());
    }, []);

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="title">Title:</Form.Label>
                <Form.Control
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter tournament title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                    <Form.Text className="text-danger">
                        {formik.errors.title}
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description:</Form.Label>
                <Form.Control
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Enter description..."
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                    <option value={-1} disabled>
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
            <Form.Group className="mb-3">
                <Form.Check
                    id="isPublic"
                    name="isPublic"
                    type="checkbox"
                    checked={formik.values.isPublic}
                    onChange={formik.handleChange}
                    label="Is Public"
                />
                {formik.touched.isPublic && formik.errors.isPublic && (
                    <Form.Text className="text-danger">
                        {formik.errors.isPublic}
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Type:</Form.Label>
                <Form.Control
                    as="select"
                    id="type"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value={-1} disabled>
                        Select tournament type
                    </option>
                    {tournamentTypes.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.name}
                        </option>
                    ))}
                </Form.Control>
                {formik.touched.type && formik.errors.type && (
                    <Form.Text className="text-danger">
                        {formik.errors.type}
                    </Form.Text>
                )}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="registrationDeadline">
                    Registration Deadline:
                </Form.Label>
                <DatePicker
                    id="registrationDeadline"
                    name="registrationDeadline"
                    minDate={new Date()}
                    minTime={new Date()}
                    maxTime={new Date(new Date().setHours(23, 59))}
                    selected={formik.values.registrationDeadline}
                    onChange={(e) =>
                        formik.setFieldValue("registrationDeadline", e)
                    }
                    onBlur={formik.handleBlur}
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeFormat="HH:mm"
                    showTimeSelect
                />
                {formik.touched.registrationDeadline &&
                    formik.errors.registrationDeadline && (
                        <Form.Text className="text-danger">
                            {formik.errors.registrationDeadline}
                        </Form.Text>
                    )}
            </Form.Group>
            <Button className="float-end" type="submit">
                Create Tournament
            </Button>
        </Form>
    );
};

export default TournamentEditor;
