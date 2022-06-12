import TeamEditor from "components/TeamEditor";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Team } from "models/Team";
import React, { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router/Routes";
import { teamActions } from "store/reducers/teamSlice";

const EditTeam: FC = () => {
    const { team } = useAppSelector((s) => s.team);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAppSelector((s) => s.account);

    useEffect(() => {
        dispatch(teamActions.loadTeamById(Number(id)));
    }, []);

    useEffect(() => {
        if (team && team.leaderId !== user?.id) {
            navigate(Routes.TeamInfo + team.id);
        }
    }, [team]);

    const updateTeam = (team: Team) => {
        dispatch(teamActions.updateTeam(team));
        navigate(Routes.TeamInfo + team.id);
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">Edit Team #{id}</Card.Title>
                <div className="mt-3">
                    {team && (
                        <TeamEditor
                            team={team}
                            save={updateTeam}
                            saveButtonText="Save Team"
                        />
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default EditTeam;
