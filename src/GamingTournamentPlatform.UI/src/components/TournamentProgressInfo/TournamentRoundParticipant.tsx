import AppIcon from "components/AppIcon";
import { Team } from "models/Team";
import { User } from "models/User";
import React, { FC } from "react";

interface TournamentRoundParticipantProps {
    participant: User | Team | null;
    isTeamRound: boolean;
    won: boolean;
}

const TournamentRoundParticipant: FC<TournamentRoundParticipantProps> = ({
    participant,
    isTeamRound,
    won,
}) => {
    const getUser = () => participant as User | null;
    const getTeam = () => participant as Team | null;

    return (
        <div className={`participant ${won && "active"}`}>
            {isTeamRound ? (
                <>
                    <AppIcon
                        icon="people-fill"
                        color={won ? "#fff" : "#0b5ed7"}
                    />
                    <span className="d-inline-block ms-2">
                        {getTeam()?.name ?? "?"}
                    </span>
                </>
            ) : (
                <>
                    <AppIcon
                        icon="person-fill"
                        color={won ? "#fff" : "#0b5ed7"}
                    />
                    <span className="d-inline-block ms-2">
                        {getUser()?.userName ?? "?"}
                    </span>
                </>
            )}
        </div>
    );
};

export default TournamentRoundParticipant;
