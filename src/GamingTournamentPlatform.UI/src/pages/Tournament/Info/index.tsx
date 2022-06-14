import TournamentBeforeStartOptions from "components/TournamentBeforeStartOptions";
import TournamentProgressInfo from "components/TournamentProgressInfo";
import TournamentRegistration from "components/TournamentRegistration";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { TournamentState } from "models/tournaments/TournamentDetails";
import React, { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { tournamentActions } from "store/reducers/tournamentSlice";

const TournamentInfo: FC = () => {
    const dispatch = useAppDispatch();

    const { tournamentDetails } = useAppSelector((s) => s.tournament);

    const { id } = useParams();

    useEffect(() => {
        dispatch(tournamentActions.clear());
        dispatch(tournamentActions.loadTournamentDetailsById(Number(id)));
    }, [id]);

    let component;
    if (
        tournamentDetails?.state === TournamentState.New ||
        tournamentDetails?.state === TournamentState.Registration
    ) {
        component = <TournamentRegistration />;
    } else if (tournamentDetails?.state === TournamentState.NotStarted) {
        component = <TournamentBeforeStartOptions />;
    } else if (
        tournamentDetails?.state === TournamentState.InProgress ||
        tournamentDetails?.state === TournamentState.Finished
    ) {
        component = <TournamentProgressInfo />;
    } else {
        component = <div>Loading...</div>;
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">
                    Tournament - {tournamentDetails?.title}
                </Card.Title>
                <div className="mt-3">{component}</div>
            </Card.Body>
        </Card>
    );
};

export default TournamentInfo;
