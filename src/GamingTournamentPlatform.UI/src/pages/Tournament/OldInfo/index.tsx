import AppIcon from "components/AppIcon";
import React, { FC } from "react";
import { Accordion, Card, Form, Tab, Tabs } from "react-bootstrap";
import "./Info.scss";

const TournamentInfo: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">
                    Arm wrestling tournament (Test Tournament #1)
                </Card.Title>
                <Accordion className="mt-4" defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>General information</Accordion.Header>
                        <Accordion.Body>
                            <div>
                                <Form.Group className="row mb-3 align-items-center">
                                    <Form.Label className="col-2">
                                        State:
                                    </Form.Label>
                                    <div className="col-2">
                                        <Form.Control
                                            readOnly
                                            plaintext
                                            value="In Progress"
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row mb-3 align-items-center">
                                    <Form.Label className="col-2">
                                        Category:
                                    </Form.Label>
                                    <div className="col-2">
                                        <Form.Control
                                            readOnly
                                            plaintext
                                            value="Arm wrestling"
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row mb-3 align-items-center">
                                    <Form.Label className="col-2">
                                        Description:
                                    </Form.Label>
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
                                        <Form.Control
                                            className="col-2"
                                            readOnly
                                            value="8"
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Tournament Grid</Accordion.Header>
                        <Accordion.Body>
                            <div className="tournament-grid">
                                <div className="row p-2 border-bottom ">
                                    <div className="col-4 grid-header-group">
                                        <div>1/4</div>
                                        <div className="text-muted">
                                            Finished
                                        </div>
                                    </div>
                                    <div className="col-4 grid-header-group">
                                        <div>Semi-final</div>
                                        <div className="text-muted">
                                            In Progress
                                        </div>
                                    </div>
                                    <div className="col-4 grid-header-group">
                                        <div>Final</div>
                                    </div>
                                </div>
                                <div className="row p-2">
                                    <div className="col-4 grid-group">
                                        <div className="participant-block">
                                            <div className="participant active">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#fff"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 1
                                                </span>
                                            </div>
                                            <div className="participant">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#0b5ed7"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 4
                                                </span>
                                            </div>
                                        </div>
                                        <div className="participant-block">
                                            <div className="participant">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#0b5ed7"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 3
                                                </span>
                                            </div>
                                            <div className="participant active">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#fff"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 5
                                                </span>
                                            </div>
                                        </div>
                                        <div className="participant-block">
                                            <div className="participant active">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#fff"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 2
                                                </span>
                                            </div>
                                            <div className="participant">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#0b5ed7"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 7
                                                </span>
                                            </div>
                                        </div>
                                        <div className="participant-block">
                                            <div className="participant active">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#fff"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 4
                                                </span>
                                            </div>
                                            <div className="participant">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#0b5ed7"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 8
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 grid-group">
                                        <div className="participant-block">
                                            <div className="participant active">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#fff"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 1
                                                </span>
                                            </div>
                                            <div className="participant">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#0b5ed7"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 5
                                                </span>
                                            </div>
                                        </div>
                                        <div className="participant-block">
                                            <div className="participant">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#0b5ed7"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 2
                                                </span>
                                            </div>
                                            <div className="participant">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#0b5ed7"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 4
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 grid-group">
                                        <div className="participant-block">
                                            <div className="participant">
                                                <AppIcon
                                                    icon="person-fill"
                                                    color="#0b5ed7"
                                                />
                                                <span className="d-inline-block ms-2">
                                                    User 1
                                                </span>
                                            </div>
                                            <div className="participant">
                                                <div className="text-center">
                                                    ?
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Game details</Accordion.Header>
                        <Accordion.Body>
                            <Tabs defaultActiveKey="0">
                                <Tab eventKey="0" title="1/4">
                                    <Tabs defaultActiveKey="0">
                                        <Tab eventKey="0" title="Game 1">
                                            <div className="mt-2">
                                                <Card>
                                                    <Card.Body>
                                                        <Form.Group className="row mb-3 align-items-center">
                                                            <Form.Label className="col-1">
                                                                State:
                                                            </Form.Label>
                                                            <div className="col-2">
                                                                <Form.Control
                                                                    readOnly
                                                                    plaintext
                                                                    value="Finished"
                                                                />
                                                            </div>
                                                        </Form.Group>
                                                        <Form.Group className="row mb-3 align-items-center">
                                                            <Form.Label className="col-1">
                                                                Date:
                                                            </Form.Label>
                                                            <div className="col-2">
                                                                01.01.2022 12:15
                                                            </div>
                                                        </Form.Group>
                                                        <Form.Group className="row mb-3 align-items-center">
                                                            <Form.Label className="col-1">
                                                                Winner:
                                                            </Form.Label>
                                                            <div className="col-2">
                                                                User 1
                                                            </div>
                                                        </Form.Group>
                                                        <Form.Group className="row mb-3 align-items-center">
                                                            <Form.Label className="col-2">
                                                                Description:
                                                            </Form.Label>
                                                            <div className="col">
                                                                <Form.Control
                                                                    as="textarea"
                                                                    readOnly
                                                                    value="First game"
                                                                />
                                                            </div>
                                                        </Form.Group>
                                                    </Card.Body>
                                                </Card>
                                                <div className="mt-1">
                                                    Competition broadcasts
                                                    (finished):
                                                </div>
                                                <div className="d-flex my-2 justify-content-center">
                                                    <iframe
                                                        id="ytplayer"
                                                        width="640"
                                                        height="360"
                                                        src="https://www.youtube.com/embed/g7TB6eBhU1M"
                                                        allowFullScreen
                                                    />
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="1" title="Game 2"></Tab>
                                        <Tab eventKey="2" title="Game 3"></Tab>
                                        <Tab eventKey="3" title="Game 4"></Tab>
                                    </Tabs>
                                </Tab>
                                <Tab eventKey="1" title="Semi-final">
                                    <Tabs defaultActiveKey="0">
                                        <Tab eventKey="0" title="Game 1"></Tab>
                                        <Tab
                                            eventKey="3"
                                            title="Game 2"
                                            disabled
                                        ></Tab>
                                    </Tabs>
                                </Tab>
                                <Tab eventKey="2" title="Final" disabled>
                                    <div>test3</div>
                                </Tab>
                            </Tabs>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
    );
};

export default TournamentInfo;
