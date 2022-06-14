import { useAppSelector } from "hooks/redux";
import React, { FC } from "react";
import { Accordion } from "react-bootstrap";
import TournamentBaseInfo from "./TournamentBaseInfo";
import TournamentGrid from "./TournamentGrid";
import TournamentRoundInfo from "./TournamentRoundInfo";

const TournamentProgressInfo: FC = () => {
    const { tournamentDetails } = useAppSelector((s) => s.tournament);
    const { user } = useAppSelector((s) => s.account);

    if (!tournamentDetails) {
        return <div>Loading...</div>;
    }

    const isTeamTournament =
        tournamentDetails.category?.allowCreatingTeams === true;

    return (
        <div>
            <Accordion className="mt-4" defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>General information</Accordion.Header>
                    <Accordion.Body>
                        <TournamentBaseInfo details={tournamentDetails} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion className="mt-4" defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Tournament Grid</Accordion.Header>
                    <Accordion.Body>
                        <TournamentGrid
                            stages={tournamentDetails.stages}
                            isTeamTournament={isTeamTournament}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion className="mt-4" defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Round details</Accordion.Header>
                    <Accordion.Body>
                        <TournamentRoundInfo
                            stages={tournamentDetails.stages}
                            isTeamTournament={isTeamTournament}
                            readonly={
                                user?.id !== tournamentDetails.organizerId
                            }
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default TournamentProgressInfo;
