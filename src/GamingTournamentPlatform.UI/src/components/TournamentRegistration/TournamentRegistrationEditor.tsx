import { useFormik } from "formik";
import { TournamentRegistrationInfo } from "models/tournaments/TournamentRegistrationInfo";
import React, { FC } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Yup from "yup";

interface TournamentRegistrationEditorProps {
    registrationInfo: TournamentRegistrationInfo;
    save: (info: TournamentRegistrationInfo) => void;
    readonly?: boolean;
}

const TournamentRegistrationEditor: FC<TournamentRegistrationEditorProps> = ({
    registrationInfo,
    save,
    readonly = false,
}) => {
    const formik = useFormik({
        initialValues: { ...registrationInfo },
        onSubmit: save,
        validationSchema: Yup.object({
            countOfParticipants: Yup.number()
                .integer()
                .oneOf([2, 4, 8, 16, 32])
                .required(),
        }),
    });
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="row mb-3 align-items-center">
                <Form.Label className="col-2">
                    Count of participants:
                </Form.Label>
                <div className="col">
                    <Form.Control
                        style={{ width: 70 }}
                        name="countOfParticipants"
                        readOnly={readonly}
                        value={formik.values.countOfParticipants}
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.countOfParticipants &&
                        formik.errors.countOfParticipants && (
                            <Form.Text className="text-danger">
                                {formik.errors.countOfParticipants}
                            </Form.Text>
                        )}
                </div>
            </Form.Group>
            <Form.Group className="mb-3 row align-items-center">
                <Form.Label className="col-2">
                    Registration Deadline:
                </Form.Label>
                <div className="col">
                    <DatePicker
                        name="registrationDeadline"
                        selected={new Date(formik.values.registrationDeadline)}
                        readOnly={readonly}
                        dateFormat="dd/MM/yyyy HH:mm"
                        timeFormat="HH:mm"
                        showTimeSelect
                        onChange={(date) =>
                            formik.setFieldValue(
                                "registrationDeadline",
                                date?.toISOString()
                            )
                        }
                        onBlur={formik.handleBlur}
                    />
                </div>
            </Form.Group>
            {!readonly && (
                <div className="d-flex justify-content-end">
                    <Button type="submit" variant="secondary">
                        Save
                    </Button>
                </div>
            )}
        </Form>
    );
};

export default TournamentRegistrationEditor;
