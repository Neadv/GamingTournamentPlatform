import { UserDetails } from "models/UserDetails";
import React, { FC } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { Routes } from "router/Routes";
import { Link } from "react-router-dom";

interface UserDetailsInfoProps {
    user: UserDetails;
}

const UserDetailsInfo: FC<UserDetailsInfoProps> = ({ user }) => {
    return (
        <div>
            <Form.Group className="mb-3 row">
                <Form.Label className="col-sm-2 col-form-label">
                    Username:
                </Form.Label>
                <div className="col-sm-10">
                    <Form.Control value={user.userName} readOnly plaintext />
                </div>
            </Form.Group>
            <Form.Group className="mb-3 row">
                <Form.Label className="col-sm-2 col-form-label">
                    Email:
                </Form.Label>
                <div className="col-sm-10">
                    <Form.Control value={user.email} readOnly plaintext />
                </div>
            </Form.Group>
            <div className="mb-3 row">
                {user.leaderTeams.length > 0 ? (
                    <div className="col-md-6">
                        <div>Leader of Teams:</div>
                        <ListGroup
                            className="m-2"
                            style={{ maxHeight: 500, overflowY: "auto" }}
                        >
                            {user.leaderTeams.map((t) => (
                                <ListGroup.Item
                                    key={t.id}
                                    action
                                    as={Link}
                                    to={Routes.TeamInfo + t.id}
                                >
                                    <div>
                                        <div>Name: {t.name}</div>
                                        <div>Category: {t.category?.name}</div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                ) : null}
                {user.teams.length > 0 ? (
                    <div className="col-md-6">
                        <div>Team member:</div>
                        <ListGroup
                            className="m-2"
                            style={{ maxHeight: 500, overflowY: "auto" }}
                        >
                            {user.teams.map((t) => (
                                <ListGroup.Item
                                    key={t.id}
                                    action
                                    as={Link}
                                    to={Routes.TeamInfo + t.id}
                                >
                                    <div>
                                        <div>Name: {t.name}</div>
                                        <div>Category: {t.category?.name}</div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default UserDetailsInfo;
