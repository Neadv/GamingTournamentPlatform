import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { FC, useEffect } from "react";
import { Button, Card, ListGroup, Tab, Tabs } from "react-bootstrap";
import { Routes } from "router/Routes";
import { userActions } from "store/reducers/userSlice";
import { Link } from "react-router-dom";
import { TournamentApplication } from "models/tournaments/TournamentApplication";

const TournamentApplications: FC = () => {
    const { tournamentApplications } = useAppSelector((s) => s.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userActions.loadTeamApplication());
    }, []);

    const invitations = tournamentApplications.filter((a) => a.inventation);
    const sendedApplications = tournamentApplications.filter(
        (a) => !a.inventation
    );

    const acceptInvitation = (invitation: TournamentApplication) => {
        dispatch(userActions.acceptTournamentApplication(invitation));
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">
                    Tournament Applications
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
                                    <Card.Header>
                                        {i.tournament?.title}
                                    </Card.Header>
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
                                        to={
                                            Routes.TournamentInfo +
                                            s.tournament?.id
                                        }
                                    >
                                        <div>{s.tournament?.title}</div>
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

export default TournamentApplications;
