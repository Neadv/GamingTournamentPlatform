import SendMessagePopup from "components/SendMessagePopup";
import TeamUserApplicationModal from "components/TeamUserApplicationModal";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { FC, useEffect, useState } from "react";
import { Button, Card, ListGroup, Tab, Tabs } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Routes } from "router/Routes";
import { teamActions } from "store/reducers/teamSlice";

const TeamInfo: FC = () => {
    const { id } = useParams();

    const { team } = useAppSelector((s) => s.team);
    const dispatch = useAppDispatch();

    const { user, isAuthorized } = useAppSelector((s) => s.account);

    const [showSendPopup, setShowSendPopup] = useState(false);

    useEffect(() => {
        dispatch(teamActions.loadTeamById(Number(id)));
    }, [id]);

    const sendJoinApplication = (message: string) => {
        if (team && user) {
            dispatch(
                teamActions.sendApplication({
                    userId: user?.id,
                    teamId: team?.id,
                    invitation: false,
                    message,
                })
            );
        }
        setShowSendPopup(false);
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">{team?.name}</Card.Title>
                {isAuthorized && (
                    <div className="float-end">
                        {user?.id === team?.leader?.id ? (
                            <>
                                <Link
                                    to={Routes.EditTeam + team?.id}
                                    className="btn btn-secondary me-2"
                                >
                                    Edit
                                </Link>
                                <TeamUserApplicationModal />
                            </>
                        ) : (
                            <Button onClick={() => setShowSendPopup(true)}>
                                Send application to join
                            </Button>
                        )}
                    </div>
                )}
                <Tabs defaultActiveKey="info" className="mt-3">
                    <Tab eventKey="info" title="Info">
                        <div className="m-2">
                            <div>Category: {team?.category?.name}</div>
                            <div>Description: {team?.description}</div>
                        </div>
                    </Tab>
                    <Tab eventKey="members" title="Members">
                        <ListGroup className="m-2">
                            <ListGroup.Item
                                action
                                href={`/user/${team?.leader?.id}`}
                                variant={"primary"}
                            >
                                {team?.leader?.userName}
                            </ListGroup.Item>
                            {team?.participants.map((m) => (
                                <ListGroup.Item
                                    action
                                    href={`/user/${m.id}`}
                                    key={m.id}
                                >
                                    {m.userName}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Tab>
                </Tabs>
            </Card.Body>
            <SendMessagePopup
                show={showSendPopup}
                cancel={() => setShowSendPopup(false)}
                confirm={sendJoinApplication}
            />
        </Card>
    );
};

export default TeamInfo;
