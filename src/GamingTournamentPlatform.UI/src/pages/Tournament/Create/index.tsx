import TournamentEditor from "components/TournamentEditor";
import React, { FC } from "react";
import { Card } from "react-bootstrap";

const CreateTournament: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">
                    Create new Tournament
                </Card.Title>
                <div className="mt-3">
                    <TournamentEditor />
                </div>
            </Card.Body>
        </Card>
    );
};

export default CreateTournament;
