import SendMessagePopup from "components/SendMessagePopup";
import TeamSearchList from "components/TeamSearchList";
import UserSearchList from "components/UserSearchList";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Team } from "models/Team";
import { TournamentDetails } from "models/tournaments/TournamentDetails";
import { User } from "models/User";
import React, { FC, useEffect, useState } from "react";
import { Button, Card, ListGroup, Modal, Tab, Tabs } from "react-bootstrap";
import { teamActions } from "store/reducers/teamSlice";
import { tournamentActions } from "store/reducers/tournamentSlice";
import { userActions } from "store/reducers/userSlice";

interface TournamentApplicationModalProps {
    details: TournamentDetails;
}

const TournamentApplicationModal: FC<TournamentApplicationModalProps> = ({
    details,
}) => {
    const [selectedEntity, setSelectedEntity] = useState<User | Team | null>(
        null
    );
    const [show, setShow] = useState(false);
    const [showInvitePopup, setShowInvitePopup] = useState(false);
    const { applications } = useAppSelector((s) => s.tournament);
    const { users } = useAppSelector((s) => s.user);
    const { teams } = useAppSelector((s) => s.team);

    const dispatch = useAppDispatch();

    const isTeamTournament = details.category?.allowCreatingTeams === true;

    const invitations = applications.filter((a) => a.inventation);

    useEffect(() => {
        dispatch(tournamentActions.loadTournamentApplicationsById(details.id));
        dispatch(userActions.loadUsers());
        if (details.category) {
            dispatch(teamActions.loadTeamsByCategoryId(details.categoryId));
        }
    }, []);

    const sendInvitation = (message: string) => {
        if (selectedEntity) {
            dispatch(
                tournamentActions.makeApplication({
                    tournamentId: details.id,
                    message: message,
                    invitation: true,
                    participantId: selectedEntity.id,
                })
            );
        }
        setShowInvitePopup(false);
    };

    const invite = (entity: User | Team) => {
        setSelectedEntity(entity);
        setShowInvitePopup(true);
    };

    return (
        <>
            <Button variant="secondary me-2" onClick={() => setShow(true)}>
                Invite / Applications
            </Button>
            <Modal show={show} onHide={() => setShow(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tournament application settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="applications">
                        <Tab
                            eventKey="applications"
                            title="Applications"
                            className="pt-3"
                        >
                            {applications
                                .filter((a) => !a.inventation)
                                .map((a) => (
                                    <Card key={a.id} className="mb-3">
                                        <Card.Header>
                                            {isTeamTournament ? (
                                                <div>{a.team?.name}</div>
                                            ) : (
                                                <div>
                                                    Username:{" "}
                                                    <strong>
                                                        {a.user?.userName}
                                                    </strong>{" "}
                                                    Email:{" "}
                                                    <strong>
                                                        {a.user?.email}
                                                    </strong>
                                                </div>
                                            )}
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
                                                        dispatch(
                                                            tournamentActions.acceptApplication(
                                                                {
                                                                    tournamentId:
                                                                        details.id,
                                                                    applicationId:
                                                                        a.id,
                                                                }
                                                            )
                                                        )
                                                    }
                                                >
                                                    Accept
                                                </Button>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                ))}
                        </Tab>
                        <Tab eventKey="Invite" title="Invite" className="pt-2">
                            {isTeamTournament ? (
                                <TeamSearchList
                                    teams={teams}
                                    actionButton="Invite"
                                    action={invite}
                                />
                            ) : (
                                <UserSearchList
                                    users={users}
                                    actionButton="Invite"
                                    action={invite}
                                />
                            )}
                        </Tab>
                        <Tab
                            eventKey="Invited"
                            title="Invited"
                            className="pt-2"
                        >
                            <ListGroup>
                                {invitations.map((i) => (
                                    <ListGroup.Item key={i.id}>
                                        {isTeamTournament
                                            ? i.team?.name
                                            : i.user?.userName}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <SendMessagePopup
                show={showInvitePopup}
                cancel={() => setShowInvitePopup(false)}
                confirm={sendInvitation}
            />
        </>
    );
};

export default TournamentApplicationModal;
