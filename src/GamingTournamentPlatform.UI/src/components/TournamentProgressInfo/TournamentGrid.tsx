import {
    TournamentStage,
    TournamentStageState,
} from "models/tournaments/TournamentStage";
import React, { FC } from "react";
import { enumToLookupArray } from "services/enumUtils";
import "./TournamentGrid.scss";
import TournamentRound from "./TournamentRound";

interface TournamentGridProps {
    stages: TournamentStage[];
    isTeamTournament: boolean;
}

const TournamentGrid: FC<TournamentGridProps> = ({
    stages,
    isTeamTournament,
}) => {
    const stageStates = enumToLookupArray(TournamentStageState);

    return (
        <div className="tournament-grid">
            <div className="row p-2 border-bottom">
                {stages.map((s) => (
                    <div key={s.id} className="col-4 grid-header-group">
                        <div>{s.name}</div>
                        <div className="text-muted">
                            {
                                stageStates.find(
                                    (state) => state.id === s.state
                                )?.name
                            }
                        </div>
                    </div>
                ))}
            </div>
            <div className="row p-2">
                {stages.map((s) => (
                    <div key={s.id} className="col-4 grid-group">
                        {isTeamTournament &&
                            s.tournamentTeamRounds.map((r) => (
                                <TournamentRound
                                    key={r.id}
                                    isTeamRound={isTeamTournament}
                                    round={r}
                                />
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TournamentGrid;
