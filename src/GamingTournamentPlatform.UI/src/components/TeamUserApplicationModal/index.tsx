import { useAppSelector } from "hooks/redux";
import React, { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const TeamUserApplicationModal: FC = () => {
    const { team } = useAppSelector((s) => s.team);
    const [show, setShow] = useState(false);

    return (
        team && (
            <>
                <Button variant="primary" onClick={() => setShow(true)}>
                    Invite
                </Button>

                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Invite users</Modal.Title>
                        <Modal.Body></Modal.Body>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShow(false)}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setShow(false)}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    );
};

export default TeamUserApplicationModal;
