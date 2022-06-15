import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Tournament } from "models/tournaments/Tournament";
import { TournamentState } from "models/tournaments/TournamentDetails";
import React, { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "router/Routes";
import { tournamentActions } from "store/reducers/tournamentSlice";

const Home: FC = () => {
    const { tournaments } = useAppSelector((s) => s.tournament);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(tournamentActions.loadTournaments());
    }, []);

    const newTournaments = tournaments
        .filter(
            (t) =>
                t.state === TournamentState.New ||
                t.state === TournamentState.Registration
        )
        .slice(-5);

    const tournamentInProgress = tournaments
        .filter((t) => t.state === TournamentState.InProgress)
        .slice(-5);

    const finishedTournaments = tournaments
        .filter((t) => t.state === TournamentState.Finished)
        .slice(-5);

    const getTournament = (tournament: Tournament) => (
        <Link
            key={tournament.id}
            to={Routes.TournamentInfo + tournament.id}
            style={{ textDecoration: "none", color: "black" }}
        >
            <Card>
                <Card.Header>
                    <Card.Title>{tournament.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div>Category: {tournament.category?.name}</div>
                    <div>{tournament.description}</div>
                </Card.Body>
            </Card>
        </Link>
    );

    return (
        <Card>
            <Card.Body>
                <div className="mb-4">
                    <h4 className="mb-3">Last finished tournaments:</h4>
                    {finishedTournaments.map((t) => getTournament(t))}
                </div>
                <div className="mb-4">
                    <h4 className="mb-3">Last started tournaments:</h4>
                    {tournamentInProgress.map((t) => getTournament(t))}
                </div>
                <div className="mb-4">
                    <h4 className="mb-3">New tournaments:</h4>
                    {newTournaments.map((t) => getTournament(t))}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Home;
