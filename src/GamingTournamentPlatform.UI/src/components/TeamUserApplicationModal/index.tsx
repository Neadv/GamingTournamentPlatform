import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { FC, useEffect, useState } from "react";
import { Button, Card, Modal, Tab, Tabs } from "react-bootstrap";
import { teamActions } from "store/reducers/teamSlice";

const TeamUserApplicationModal: FC = () => {
    const { team } = useAppSelector((s) => s.team);
    const [show, setShow] = useState(false);

    const { applications } = useAppSelector((s) => s.team);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (show && team) {
            dispatch(teamActions.loadTeamApplication(team.id));
        }
    }, [show, team]);

    const acceptApplication = (applicationId?: number) => {
        if (team && applicationId) {
            dispatch(
                teamActions.acceptApplication({
                    teamId: team.id,
                    applicationId,
                })
            );
        }
    };

    return (
        team && (
            <>
                <Button variant="primary" onClick={() => setShow(true)}>
                    Applications / Invite user
                </Button>

                <Modal show={show} onHide={() => setShow(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Team application settings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs defaultActiveKey="applications">
                            <Tab
                                eventKey="applications"
                                title="Applications"
                                className="pt-3"
                            >
                                {applications.map((a) => (
                                    <Card key={a.id} className="mb-3">
                                        <Card.Header>
                                            Username:{" "}
                                            <strong>{a.user?.userName}</strong>{" "}
                                            Email:{" "}
                                            <strong>{a.user?.email}</strong>
                                        </Card.Header>
                                        <Card.Body>{a.message}</Card.Body>
                                        <Card.Footer>
                                            <div className="float-end">
                                                <Button
                                                    variant="danger"
                                                    className="me-2"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="success"
                                                    onClick={() =>
                                                        acceptApplication(a.id)
                                                    }
                                                >
                                                    Accept
                                                </Button>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                ))}
                            </Tab>
                            <Tab eventKey="Invite" title="Invite"></Tab>
                        </Tabs>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShow(false)}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setShow(false)}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    );
};

export default TeamUserApplicationModal;
