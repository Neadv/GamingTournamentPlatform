import TournamentEditor from "components/TournamentEditor";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { TournamentState } from "models/tournaments/TournamentDetails";
import React, { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router/Routes";
import { tournamentActions } from "store/reducers/tournamentSlice";

const EditTournament: FC = () => {
    const dispatch = useAppDispatch();
    const { tournament, isSuccess } = useAppSelector((s) => s.tournament);
    const { id } = useParams();
    const { user } = useAppSelector((s) => s.account);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(tournamentActions.loadTournamentById(Number(id)));
    }, [id]);

    useEffect(() => {
        if (isSuccess && tournament) {
            dispatch(tournamentActions.clear());
            navigate(Routes.TournamentInfo + tournament.id);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (
            tournament &&
            user &&
            (tournament.organizerId !== user.id ||
                tournament.state !== TournamentState.New)
        ) {
            navigate(Routes.TournamentInfo + tournament.id);
        }
    }, [tournament, user]);

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">
                    Edit Tournament #{id}
                </Card.Title>
                <div className="mt-3">
                    {tournament && (
                        <TournamentEditor
                            tournament={tournament}
                            saveButtonText="Edit Tournament Info"
                            showRegistrationDate={false}
                            save={(tournament) =>
                                dispatch(
                                    tournamentActions.updateTournament(
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

export default EditTournament;
