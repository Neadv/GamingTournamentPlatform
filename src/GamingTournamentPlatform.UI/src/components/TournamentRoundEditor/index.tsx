import { useFormik } from "formik";
import { TournamentRound } from "models/tournaments/TournamentRound";
import React, { FC } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Yup from "yup";

interface TournamentRoundEditorProps {
    round: TournamentRound;
    save: (round: TournamentRound) => void;
}

const TournamentRoundEditor: FC<TournamentRoundEditorProps> = ({
    round,
    save,
}) => {
    const formik = useFormik({
        initialValues: { ...round },
        validationSchema: Yup.object({
            description: Yup.string().required("Description is required"),
            date: Yup.date().required("Required"),
            youtubeUrl: Yup.string(),
        }),
        onSubmit: save,
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
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
                <Form.Label htmlFor="youtubeUrl">Youtube Link:</Form.Label>
                <Form.Control
                    id="youtubeUrl"
                    name="youtubeUrl"
                    placeholder="Enter YouTube Url"
                    value={formik.values.youtubeUrl ?? ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.youtubeUrl && formik.errors.youtubeUrl && (
                    <Form.Text className="text-danger">
                        {formik.errors.youtubeUrl}
                    </Form.Text>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="registrationDeadline">Date:</Form.Label>
                <DatePicker
                    id="date"
                    name="date"
                    selected={new Date(formik.values.date)}
                    onChange={(e) =>
                        formik.setFieldValue("date", e?.toISOString())
                    }
                    onBlur={formik.handleBlur}
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeFormat="HH:mm"
                    showTimeSelect
                />
                {formik.touched.date && formik.errors.date && (
                    <Form.Text className="text-danger">
                        {formik.errors.date}
                    </Form.Text>
                )}
            </Form.Group>

            <Button className="float-end" type="submit">
                Save
            </Button>
        </Form>
    );
};

export default TournamentRoundEditor;
