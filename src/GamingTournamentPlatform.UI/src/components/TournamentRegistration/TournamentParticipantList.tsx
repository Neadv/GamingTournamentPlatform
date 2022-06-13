import { TournamentDetails } from "models/tournaments/TournamentDetails";
import React, { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "router/Routes";

interface TournamentParticipantListProps {
    details: TournamentDetails;
}

const TournamentParticipantList: FC<TournamentParticipantListProps> = ({
    details,
}) => {
    const getTeamLookups = () => {
        return details.teamParticipants.map((t) => (
            <ListGroup.Item
                action
                key={t.id}
                as={Link}
                to={Routes.TeamInfo + t.id}
            >
                {t.name}
            </ListGroup.Item>
        ));
    };

    const getUserLookups = () => {
        return details.userParticipants.map((u) => (
            <ListGroup.Item action key={u.id} as={Link} to={Routes.User + u.id}>
                {u.userName}
            </ListGroup.Item>
        ));
    };

    const getLookups = details.category?.allowCreatingTeams
        ? getTeamLookups
        : getUserLookups;

    return <ListGroup>{getLookups()}</ListGroup>;
};

export default TournamentParticipantList;
