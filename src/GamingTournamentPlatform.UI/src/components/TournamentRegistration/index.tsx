import TournamentApplicationModal from "components/TournamentApplicationModal";
import TournamentBaseInfo from "components/TournamentBaseInfo";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { TournamentState } from "models/tournaments/TournamentDetails";
import { TournamentRegistrationInfo } from "models/tournaments/TournamentRegistrationInfo";
import React, { FC } from "react";
import { Accordion, Button } from "react-bootstrap";
import { tournamentActions } from "store/reducers/tournamentSlice";
import TournamentParticipantList from "./TournamentParticipantList";
import TournamentRegistrationEditor from "./TournamentRegistrationEditor";

const TournamentRegistration: FC = () => {
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((s) => s.account);
    const { tournamentDetails } = useAppSelector((s) => s.tournament);

    const saveRegistrationInfo = (info: TournamentRegistrationInfo) => {
        if (tournamentDetails) {
            dispatch(
                tournamentActions.updateTournamentRegistration({
                    tournamentId: tournamentDetails.id,
                    registrationDeadline: info.registrationDeadline,
                    countOfParticipants: info.countOfParticipants,
                })
            );
        }
    };

    if (!tournamentDetails) {
        return <div>Empty...</div>;
    }

    const readonly = !user || user.id !== tournamentDetails.organizerId;

    return (
        <>
            <h4 className="text-center">Registration Stage</h4>
            <div className="mt-3">
                <Accordion defaultActiveKey="0" className="mb-2">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Information</Accordion.Header>
                        <Accordion.Body>
                            <TournamentBaseInfo
                                tournament={tournamentDetails}
                                readonly={readonly}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Accordion defaultActiveKey="0" className="mb-2">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Registration</Accordion.Header>
                        <Accordion.Body>
                            <TournamentRegistrationEditor
                                registrationInfo={
                                    tournamentDetails.registrationInfo
                                }
                                save={saveRegistrationInfo}
                                readonly={readonly}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                {tournamentDetails.state === TournamentState.Registration && (
                    <Accordion defaultActiveKey="0" className="mb-2">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Participants</Accordion.Header>
                            <Accordion.Body>
                                <TournamentParticipantList
                                    details={tournamentDetails}
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )}
                {!readonly && (
                    <div>
                        {tournamentDetails.state === TournamentState.New && (
                            <div className="d-flex justify-content-end">
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        dispatch(
                                            tournamentActions.startRegistration(
                                                tournamentDetails.id
                                            )
                                        )
                                    }
                                >
                                    Start Registration
                                </Button>
                            </div>
                        )}
                        {tournamentDetails.state ===
                            TournamentState.Registration && (
                            <div className="d-flex justify-content-end">
                                <TournamentApplicationModal
                                    details={tournamentDetails}
                                />
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        dispatch(
                                            tournamentActions.finishRegistration(
                                                tournamentDetails.id
                                            )
                                        )
                                    }
                                >
                                    Finish Registration
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default TournamentRegistration;
