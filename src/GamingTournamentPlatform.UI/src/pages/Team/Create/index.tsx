import TeamEditor from "components/TeamEditor";
import React, { FC } from "react";
import { Card } from "react-bootstrap";

const CreateTeam: FC = () => {
    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">Create new Team</Card.Title>
                <div className="mt-3">
                    <TeamEditor />
                </div>
            </Card.Body>
        </Card>
    );
};

export default CreateTeam;
