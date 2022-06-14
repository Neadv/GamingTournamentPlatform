import TournamentRoundViewer from "components/TournamentRoundViewer";
import { TournamentStage } from "models/tournaments/TournamentStage";
import React, { FC } from "react";
import { Tab, Tabs } from "react-bootstrap";

interface TournamentRoundInfoProps {
    stages: TournamentStage[];
    isTeamTournament: boolean;
    readonly: boolean;
}

const TournamentRoundInfo: FC<TournamentRoundInfoProps> = ({
    stages,
    isTeamTournament,
    readonly,
}) => {
    const getRounds = (stage: TournamentStage) =>
        isTeamTournament
            ? stage.tournamentTeamRounds
            : stage.tournamentUserRounds;

    return (
        <Tabs defaultActiveKey={stages[0].name}>
            {stages.map((s) => (
                <Tab key={s.id} eventKey={s.name} title={s.name}>
                    <Tabs defaultActiveKey={getRounds(s)[0].id}>
                        {getRounds(s).map((r, index) => (
                            <Tab
                                key={r.id}
                                eventKey={r.id}
                                title={`Round ${index + 1}`}
                                className="pt-3"
                            >
                                <TournamentRoundViewer
                                    round={r}
                                    readonly={readonly}
                                />
                            </Tab>
                        ))}
                    </Tabs>
                </Tab>
            ))}
        </Tabs>
    );
};

export default TournamentRoundInfo;
