import AppIcon from "components/AppIcon";
import React, { FC } from "react";
import { Card, Form, Button, ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";

const TournamentRegistration: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">
                    Arm wrestling tournament (Test Tournament #1)
                </Card.Title>
                <Card.Subtitle
                    className="text-center"
                    style={{ fontWeight: "bold" }}
                >
                    Registration stage
                </Card.Subtitle>
                <div className="mt-3">
                    <Form.Group className="row mb-3 align-items-center">
                        <Form.Label className="col-2">Category:</Form.Label>
                        <div className="col-2">
                            <Form.Control
                                readOnly
                                plaintext
                                value="Arm wrestling"
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
                                value="Arm wrestling test tournament"
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="row mb-3 align-items-center">
                        <Form.Label className="col-2">
                            Count of participants:
                        </Form.Label>
                        <div className="col-1">
                            <Form.Control className="col-2" value="8" />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3 row align-items-center">
                        <Form.Label className="col-2">
                            Registration Deadline:
                        </Form.Label>
                        <div className="col-2">
                            <DatePicker
                                minDate={new Date()}
                                minTime={new Date()}
                                maxTime={new Date(new Date().setHours(23, 59))}
                                selected={new Date("2022-06-04 10:00")}
                                dateFormat="dd/MM/yyyy HH:mm"
                                timeFormat="HH:mm"
                                showTimeSelect
                                onChange={(date) => console.log(date)}
                            />
                        </div>
                    </Form.Group>
                    <div className="mb-3">
                        <div className="mb-2">
                            <strong>Registered players:</strong>
                        </div>
                        <ListGroup>
                            <ListGroup.Item action>
                                <AppIcon icon="person-fill" color="#0b5ed7" />
                                <span className="d-inline-block ms-2">
                                    User 1
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                <AppIcon icon="person-fill" color="#0b5ed7" />
                                <span className="d-inline-block ms-2">
                                    User 2
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                <AppIcon icon="person-fill" color="#0b5ed7" />
                                <span className="d-inline-block ms-2">
                                    User 3
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                <AppIcon icon="person-fill" color="#0b5ed7" />
                                <span className="d-inline-block ms-2">
                                    User 4
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                <AppIcon icon="person-fill" color="#0b5ed7" />
                                <span className="d-inline-block ms-2">
                                    User 5
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                <AppIcon icon="person-fill" color="#0b5ed7" />
                                <span className="d-inline-block ms-2">
                                    User 6
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                <AppIcon icon="person-fill" color="#0b5ed7" />
                                <span className="d-inline-block ms-2">
                                    User 7
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item action>
                                <AppIcon icon="person-fill" color="#0b5ed7" />
                                <span className="d-inline-block ms-2">
                                    User 8
                                </span>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary me-2">
                            Show applications
                        </Button>
                        <Button variant="primary me-2">Invite players</Button>
                        <Button variant="warning me-2">Change deadline</Button>
                        <Button variant="secondary">Finish registration</Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default TournamentRegistration;
