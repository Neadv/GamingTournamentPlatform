import TeamEditor from "components/TeamEditor";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Team } from "models/Team";
import React, { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Routes } from "router/Routes";
import { teamActions } from "store/reducers/teamSlice";

const CreateTeam: FC = () => {
    const { team } = useAppSelector((s) => s.team);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(teamActions.createNewTeam());
    }, []);

    const createTeam = (team: Team) => {
        dispatch(teamActions.createTeam(team));
        navigate(Routes.Home);
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">Create new Team</Card.Title>
                <div className="mt-3">
                    {team && (
                        <TeamEditor
                            team={team}
                            save={createTeam}
                            saveButtonText="Create new Team"
                        />
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default CreateTeam;