import React, { FC, useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";

interface SendMessagePopupProps {
    show: boolean;
    confirm: (message: string) => void;
    cancel: () => void;
    title?: string;
    closeText?: string;
    confirmText?: string;
}

const SendMessagePopup: FC<SendMessagePopupProps> = ({
    show,
    confirm,
    cancel,
    title = "Send message",
    closeText = "Close",
    confirmText = "Send",
}) => {
    const [message, setMessage] = useState("");

    return (
        <Modal show={show} onHide={() => cancel()}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    as="textarea"
                    placeholder="Enter message"
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => cancel()}>
                    {closeText}
                </Button>
                <Button variant="primary" onClick={() => confirm(message)}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SendMessagePopup;
