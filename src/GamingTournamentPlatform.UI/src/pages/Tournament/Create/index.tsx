import TournamentEditor from "components/TournamentEditor";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Routes } from "router/Routes";
import { tournamentActions } from "store/reducers/tournamentSlice";

const CreateTournament: FC = () => {
    const dispatch = useAppDispatch();
    const { tournament, isSuccess } = useAppSelector((s) => s.tournament);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(tournamentActions.createNewTournament());
    }, []);

    useEffect(() => {
        if (isSuccess && tournament) {
            dispatch(tournamentActions.clear());
            navigate(Routes.TournamentInfo + tournament.id);
        }
    }, [isSuccess]);

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">
                    Create new Tournament
                </Card.Title>
                <div className="mt-3">
                    {tournament && (
                        <TournamentEditor
                            tournament={tournament}
                            saveButtonText="Create new Tournament"
                            showRegistrationDate
                            save={(tournament) =>
                                dispatch(
                                    tournamentActions.createTournament(
                                        tournament
                                    )
                                )
                            }
                        />
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default CreateTournament;
