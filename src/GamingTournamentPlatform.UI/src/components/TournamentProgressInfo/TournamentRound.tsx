import { TournamentTeamRound } from "models/tournaments/TournamentTeamRound";
import { TournamentUserRound } from "models/tournaments/TournamentUserRound";
import React, { FC } from "react";
import TournamentRoundParticipant from "./TournamentRoundParticipant";

interface TournamentRoundProps {
    round: TournamentUserRound | TournamentTeamRound;
    isTeamRound: boolean;
}

const TournamentRound: FC<TournamentRoundProps> = ({ round, isTeamRound }) => {
    return (
        <div className="participant-block">
            <TournamentRoundParticipant
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                participant={round.firstParticipant!}
                isTeamRound={isTeamRound}
                won={round.firstParticipantWon === true}
            />
            <TournamentRoundParticipant
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                participant={round.secondParticipant!}
                isTeamRound={isTeamRound}
                won={round.firstParticipantWon === false}
            />
        </div>
    );
};

export default TournamentRound;
