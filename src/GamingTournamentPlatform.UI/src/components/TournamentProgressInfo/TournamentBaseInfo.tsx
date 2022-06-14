import {
    TournamentDetails,
    TournamentState,
    TournamentType,
} from "models/tournaments/TournamentDetails";
import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { enumToLookupArray } from "services/enumUtils";

interface TournamentBaseInfoProps {
    details: TournamentDetails;
}

const TournamentBaseInfo: FC<TournamentBaseInfoProps> = ({ details }) => {
    const states = enumToLookupArray(TournamentState);
    const types = enumToLookupArray(TournamentType);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleChange = () => {};

    return (
        <div>
            <Form.Group className="row mb-3 align-items-center">
                <Form.Label className="col-2">State:</Form.Label>
                <div className="col-2">
                    <Form.Control
                        readOnly
                        plaintext
                        value={states.find((s) => s.id === details.state)?.name}
                        onChange={handleChange}
                    />
                </div>
            </Form.Group>
            <Form.Group className="row mb-3 align-items-center">
                <Form.Label className="col-2">Type:</Form.Label>
                <div className="col-2">
                    <Form.Control
                        readOnly
                        plaintext
                        value={types.find((s) => s.id === details.type)?.name}
                        onChange={handleChange}
                    />
                </div>
            </Form.Group>
            <Form.Group className="row mb-3 align-items-center">
                <Form.Label className="col-2">Category:</Form.Label>
                <div className="col-2">
                    <Form.Control
                        readOnly
                        plaintext
                        value={details.category?.name}
                        onChange={handleChange}
                    />
                </div>
            </Form.Group>
            <Form.Group className="row mb-3 align-items-center">
                <Form.Label className="col-2">Description:</Form.Label>
                <div className="col">
                    <Form.Control
                        as="textarea"
                        readOnly
                        plaintext
                        value={details.description}
                        onChange={handleChange}
                    />
                </div>
            </Form.Group>
            <Form.Group className="row mb-3 align-items-center">
                <Form.Label className="col-2">
                    Count of participants:
                </Form.Label>
                <div className="col-1">
                    <Form.Control
                        className="col-2"
                        readOnly
                        value={details.registrationInfo?.countOfParticipants}
                        onChange={handleChange}
                    />
                </div>
            </Form.Group>
        </div>
    );
};

export default TournamentBaseInfo;
