import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Team } from "models/Team";
import { TournamentApplication } from "models/tournaments/TournamentApplication";
import React, { FC, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { teamActions } from "store/reducers/teamSlice";

interface TeamApplicationListProps {
    team: Team;
}

const TeamApplicationList: FC<TeamApplicationListProps> = ({ team }) => {
    const { tournamentApplications } = useAppSelector((s) => s.team);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(teamActions.loadTournamentApplication(team.id));
    }, [team]);

    const invitations = tournamentApplications.filter((a) => a.inventation);

    const acceptInvitation = (invitation: TournamentApplication) => {
        dispatch(teamActions.acceptTournamentApplication(invitation));
    };

    return (
        <div>
            {invitations.map((i) => (
                <Card key={i.id}>
                    <Card.Header>{i.tournament?.title}</Card.Header>
                    <Card.Body>{i.message}</Card.Body>
                    <Card.Footer>
                        <div className="float-end">
                            <Button variant="danger" className="me-2">
                                Cancel
                            </Button>
                            <Button
                                variant="success"
                                onClick={() => acceptInvitation(i)}
                            >
                                Accept
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            ))}
        </div>
    );
};

export default TeamApplicationList;
