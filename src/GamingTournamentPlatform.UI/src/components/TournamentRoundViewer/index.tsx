import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Team } from "models/Team";
import { TournamentRoundState } from "models/tournaments/TournamentRound";
import { TournamentTeamRound } from "models/tournaments/TournamentTeamRound";
import { TournamentUserRound } from "models/tournaments/TournamentUserRound";
import { User } from "models/User";
import React, { FC, useState } from "react";
import { Button, Card, Form, FormCheck, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getFormattedDateString } from "services/dateUtils";
import { enumToLookupArray } from "services/enumUtils";
import { tournamentActions } from "store/reducers/tournamentSlice";

interface TournamentRoundViewerProps {
    round: TournamentUserRound | TournamentTeamRound;
    readonly?: boolean;
}

const TournamentRoundViewer: FC<TournamentRoundViewerProps> = ({
    round,
    readonly = false,
}) => {
    const states = enumToLookupArray(TournamentRoundState);
    const { tournamentDetails } = useAppSelector((s) => s.tournament);
    const [showModal, setShowModal] = useState(false);
    const [firstParticipantWon, setFirstParticipantWon] = useState<
        boolean | null
    >(null);

    const dispatch = useAppDispatch();

    const getWinner = () => {
        if (round.firstParticipantWon === true) {
            return (
                (round.firstParticipant as Team).name ??
                (round.firstParticipant as User).userName
            );
        } else if (round.firstParticipantWon === false) {
            return (
                (round.secondParticipant as Team).name ??
                (round.secondParticipant as User).userName
            );
        }
        return "";
    };

    if (!tournamentDetails) {
        return null;
    }

    const finishRound = () => {
        if (firstParticipantWon != null) {
            dispatch(
                tournamentActions.finishRound({
                    tournamentId: tournamentDetails.id,
                    roundId: round.id,
                    firstParticipantWon: firstParticipantWon,
                })
            );
            setShowModal(false);
        }
    };

    return (
        <div>
            <Card>
                <Card.Body>
                    <Form.Group className="row mb-3 align-items-center">
                        <Form.Label className="col-sm-2">State:</Form.Label>
                        <div className="col">
                            <Form.Control
                                readOnly
                                plaintext
                                value={
                                    states.find((s) => s.id === round.state)
                                        ?.name
                                }
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="row mb-3 align-items-center">
                        <Form.Label className="col-sm-2">Date:</Form.Label>
                        <div className="col">
                            <Form.Control
                                readOnly
                                plaintext
                                value={getFormattedDateString(
                                    new Date(round.date)
                                )}
                            />
                        </div>
                    </Form.Group>
                    {getWinner() && (
                        <Form.Group className="row mb-3 align-items-center">
                            <Form.Label className="col-sm-2">
                                Winner:
                            </Form.Label>
                            <div className="col">{getWinner()}</div>
                        </Form.Group>
                    )}
                    <Form.Group className="row mb-3 align-items-center">
                        <Form.Label className="col-sm-2">
                            Description:
                        </Form.Label>
                        <div className="col">
                            <Form.Control
                                as="textarea"
                                readOnly
                                value={round.description}
                            />
                        </div>
                    </Form.Group>
                </Card.Body>
            </Card>
            {round.youtubeUrl && (
                <div>
                    <div className="mt-1">
                        Competition broadcasts{" "}
                        {round.state === TournamentRoundState.Finished
                            ? "(finished)"
                            : ""}
                        :
                    </div>
                    <div className="d-flex my-2 justify-content-center">
                        <iframe
                            id="ytplayer"
                            width="640"
                            height="360"
                            src={`https://www.youtube.com/embed/${round.youtubeUrl}`}
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
            {!readonly && (
                <div className="d-flex justify-content-end mt-2">
                    <Link
                        to={`/tournament/${tournamentDetails.id}/round/${round.id}`}
                        className="btn btn-secondary"
                    >
                        Edit
                    </Link>
                    {round.state === TournamentRoundState.NotStarted &&
                        new Date(round.date) <= new Date() && (
                            <Button
                                className="ms-2"
                                onClick={() =>
                                    dispatch(
                                        tournamentActions.startRound({
                                            tournamentId: tournamentDetails.id,
                                            roundId: round.id,
                                        })
                                    )
                                }
                            >
                                Start round
                            </Button>
                        )}
                    {round.state === TournamentRoundState.InProgress && (
                        <Button
                            className="ms-2"
                            onClick={() => setShowModal(true)}
                        >
                            Finish round
                        </Button>
                    )}
                </div>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Finish round</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <FormCheck
                            id="firstParticipantWon"
                            name="firstParticipantWon"
                            type="checkbox"
                            checked={firstParticipantWon === true}
                            onChange={(e) =>
                                setFirstParticipantWon(e.target.checked)
                            }
                            label="First Participant"
                        />
                        <FormCheck
                            id="secondParticipantWon"
                            name="secondParticipantWon"
                            type="checkbox"
                            checked={firstParticipantWon === false}
                            onChange={(e) =>
                                setFirstParticipantWon(!e.target.checked)
                            }
                            label="Second Participant"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => () => setShowModal(false)}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={finishRound}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TournamentRoundViewer;
