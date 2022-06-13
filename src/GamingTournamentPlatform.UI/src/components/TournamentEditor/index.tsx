import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { LookupEntity } from "models/LookupEntity";
import { Tournament } from "models/tournaments/Tournament";
import { TournamentType } from "models/tournaments/TournamentDetails";
import React, { FC, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { enumToLookupArray } from "services/enumUtils";
import { categoryActions } from "store/reducers/categorySlice";
import { getTeamCategories } from "store/selectors/categorySelectors";
import * as Yup from "yup";

interface TournamentEditorProps {
    tournament: Tournament;
    save: (tournament: Tournament) => void;
    saveButtonText?: string;
    showRegistrationDate?: boolean;
}

const TournamentEditor: FC<TournamentEditorProps> = ({
    tournament,
    save,
    saveButtonText = "Save",
    showRegistrationDate = true,
}) => {
    const formik = useFormik({
        initialValues: { ...tournament },
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
        onSubmit: save,
    });

    const tournamentTypes: LookupEntity[] = enumToLookupArray(TournamentType);

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
                    onChange={(v) =>
                        formik.setFieldValue(
                            "categoryId",
                            Number(v.target.value)
                        )
                    }
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
                <Form.Label htmlFor="type">Type:</Form.Label>
                <Form.Control
                    as="select"
                    id="type"
                    name="type"
                    value={formik.values.type}
                    onChange={(v) =>
                        formik.setFieldValue("type", Number(v.target.value))
                    }
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
            {showRegistrationDate && (
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="registrationDeadline">
                        Registration Deadline:
                    </Form.Label>
                    <DatePicker
                        id="registrationDeadline"
                        name="registrationDeadline"
                        selected={new Date(formik.values.registrationDeadline)}
                        onChange={(e) =>
                            formik.setFieldValue(
                                "registrationDeadline",
                                e?.toISOString()
                            )
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
            )}
            <Button className="float-end" type="submit">
                {saveButtonText}
            </Button>
        </Form>
    );
};

export default TournamentEditor;
