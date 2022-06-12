import TeamUserApplicationModal from "components/TeamUserApplicationModal";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { FC, useEffect } from "react";
import { Button, Card, ListGroup, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { teamActions } from "store/reducers/teamSlice";

const TeamInfo: FC = () => {
    const { id } = useParams();

    const { team } = useAppSelector((s) => s.team);
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((s) => s.account);

    useEffect(() => {
        dispatch(teamActions.loadTeamById(Number(id)));
    }, [id]);

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">{team?.name}</Card.Title>
                <div className="float-end">
                    {user?.id === team?.leader.id ? (
                        <TeamUserApplicationModal />
                    ) : (
                        <Button>Send application to join</Button>
                    )}
                </div>
                <Tabs defaultActiveKey="info" className="mt-3">
                    <Tab eventKey="info" title="Info">
                        <div className="m-2">
                            <div>Category: {team?.category.name}</div>
                            <div>Description: {team?.description}</div>
                        </div>
                    </Tab>
                    <Tab eventKey="members" title="Members">
                        <ListGroup className="m-2">
                            {team?.members.map((m) => (
                                <ListGroup.Item
                                    action
                                    href={`/user/${m.id}`}
                                    key={m.id}
                                    variant={
                                        m.id === team.leader.id
                                            ? "primary"
                                            : undefined
                                    }
                                >
                                    {m.username}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Tab>
                </Tabs>
            </Card.Body>
        </Card>
    );
};

export default TeamInfo;
