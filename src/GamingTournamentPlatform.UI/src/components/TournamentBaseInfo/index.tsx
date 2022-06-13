import { Tournament } from "models/tournaments/Tournament";
import {
    TournamentDetails,
    TournamentState,
} from "models/tournaments/TournamentDetails";
import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "router/Routes";

interface TournamentBaseInfoProps {
    tournament: Tournament | TournamentDetails;
    readonly?: boolean;
}

const TournamentBaseInfo: FC<TournamentBaseInfoProps> = ({
    tournament,
    readonly = false,
}) => {
    return (
        <div>
            <Form.Group className="row mb-3 align-items-center">
                <Form.Label className="col-2">Category:</Form.Label>
                <div className="col-2">
                    <Form.Control readOnly value={tournament.category?.name} />
                </div>
            </Form.Group>
            <Form.Group className="row mb-3 align-items-center">
                <Form.Label className="col-2">Description:</Form.Label>
                <div className="col">
                    <Form.Control
                        as="textarea"
                        readOnly
                        value={tournament.description}
                    />
                </div>
            </Form.Group>
            {tournament.state === TournamentState.New && !readonly && (
                <div className="d-flex justify-content-end">
                    <Link
                        className="btn btn-secondary"
                        to={Routes.TournamentEdit + tournament.id}
                    >
                        Edit
                    </Link>
                </div>
            )}
        </div>
    );
};

export default TournamentBaseInfo;
