import SendMessagePopup from "components/SendMessagePopup";
import UserSearchList from "components/UserSearchList";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { User } from "models/User";
import React, { FC, useEffect, useState } from "react";
import { Button, Card, Modal, Tab, Tabs } from "react-bootstrap";
import { teamActions } from "store/reducers/teamSlice";
import { userActions } from "store/reducers/userSlice";

const TeamUserApplicationModal: FC = () => {
    const { team } = useAppSelector((s) => s.team);
    const { users } = useAppSelector((s) => s.user);
    const [show, setShow] = useState(false);
    const [showInvitePopup, setShowInvitePopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const { applications } = useAppSelector((s) => s.team);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (show && team) {
            dispatch(teamActions.loadTeamApplication(team.id));
            dispatch(userActions.loadUsers());
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

    const invitedUser = applications
        .filter((a) => a.invitation)
        .map((a) => a.user as User);

    const filteredUsers = users.filter(
        (u) =>
            u.id !== team?.leaderId &&
            !team?.participants.find((p) => p.id === u.id) &&
            !invitedUser.find((i) => i.id === u.id)
    );

    const inviteUsers = (user: User) => {
        setSelectedUser(user);
        setShowInvitePopup(true);
    };

    const sendInvitation = (message: string) => {
        if (selectedUser && team) {
            dispatch(
                teamActions.sendApplication({
                    teamId: team.id,
                    userId: selectedUser.id,
                    message: message,
                    invitation: true,
                })
            );
        }
        setShowInvitePopup(false);
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
                                {applications
                                    .filter((a) => !a.invitation)
                                    .map((a) => (
                                        <Card key={a.id} className="mb-3">
                                            <Card.Header>
                                                Username:{" "}
                                                <strong>
                                                    {a.user?.userName}
                                                </strong>{" "}
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
                                                            acceptApplication(
                                                                a.id
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
                            <Tab
                                eventKey="Invite"
                                title="Invite"
                                className="pt-2"
                            >
                                <UserSearchList
                                    users={filteredUsers}
                                    actionButton="Invite"
                                    action={inviteUsers}
                                />
                            </Tab>
                            <Tab
                                eventKey="InvitedUsers"
                                title="Invited Users"
                                className="pt-2"
                            >
                                <UserSearchList
                                    users={invitedUser}
                                    enabledSearch={false}
                                />
                            </Tab>
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
                <SendMessagePopup
                    show={showInvitePopup}
                    cancel={() => setShowInvitePopup(false)}
                    confirm={sendInvitation}
                />
            </>
        )
    );
};

export default TeamUserApplicationModal;
