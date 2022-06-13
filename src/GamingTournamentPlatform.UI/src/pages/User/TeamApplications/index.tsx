import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { FC, useEffect } from "react";
import { Button, Card, ListGroup, Tab, Tabs } from "react-bootstrap";
import { Routes } from "router/Routes";
import { userActions } from "store/reducers/userSlice";
import { Link } from "react-router-dom";
import { TeamUserApplication } from "models/TeamUserApplication";

const UserTeamApplications: FC = () => {
    const { teamApplications } = useAppSelector((s) => s.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.loadTeamApplication());
    }, []);

    const invitations = teamApplications.filter((a) => a.invitation);
    const sendedApplications = teamApplications.filter((a) => !a.invitation);

    const acceptInvitation = (invitation: TeamUserApplication) => {
        dispatch(userActions.acceptTeamApplication(invitation));
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">
                    Team Applications
                </Card.Title>
                <div className="mb-3">
                    <Tabs defaultActiveKey="invitations">
                        <Tab
                            eventKey="invitations"
                            title="Invitations"
                            className="pt-2"
                        >
                            {invitations.map((i) => (
                                <Card key={i.id}>
                                    <Card.Header>{i.team?.name}</Card.Header>
                                    <Card.Body>{i.message}</Card.Body>
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
                                                    acceptInvitation(i)
                                                }
                                            >
                                                Accept
                                            </Button>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            ))}
                        </Tab>
                        <Tab
                            eventKey="sendedApplications"
                            title="Sended Applications"
                        >
                            <ListGroup className="mt-2">
                                {sendedApplications.map((s) => (
                                    <ListGroup.Item
                                        key={s.id}
                                        action
                                        as={Link}
                                        to={Routes.TeamInfo + s.teamId}
                                    >
                                        <div>
                                            <div>Team: {s.team?.name}</div>
                                            <div>Message: {s.message}</div>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Tab>
                    </Tabs>
                </div>
            </Card.Body>
        </Card>
    );
};

export default UserTeamApplications;
