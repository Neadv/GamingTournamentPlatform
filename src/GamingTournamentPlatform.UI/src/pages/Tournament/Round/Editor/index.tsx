import TournamentRoundEditor from "components/TournamentRoundEditor";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { TournamentRound } from "models/tournaments/TournamentRound";
import React, { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router/Routes";
import { tournamentActions } from "store/reducers/tournamentSlice";

const EditTournamentRound: FC = () => {
    const { id, roundId } = useParams();
    const navigate = useNavigate();

    const { tournamentRound, isSuccess } = useAppSelector((s) => s.tournament);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(tournamentActions.clear());
        dispatch(
            tournamentActions.loadTournamentRoundById({
                tournamentId: Number(id),
                roundId: Number(roundId),
            })
        );
    }, [id, roundId]);

    useEffect(() => {
        if (isSuccess) {
            navigate(Routes.TournamentInfo + id);
        }
    }, [isSuccess]);

    const save = (round: TournamentRound) => {
        dispatch(
            tournamentActions.updateRound({
                tournamentId: Number(id),
                roundId: round.id,
                description: round.description,
                date: round.date,
                youtubeUrl: round.youtubeUrl,
            })
        );
    };

    if (!tournamentRound) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">
                    Edit Tournament Round
                </Card.Title>
                <div className="mt-3">
                    <TournamentRoundEditor
                        round={tournamentRound}
                        save={save}
                    />
                </div>
            </Card.Body>
        </Card>
    );
};

export default EditTournamentRound;
