import { Team } from "models/Team";
import React, { FC, useState } from "react";
import { Button, FormControl, ListGroup } from "react-bootstrap";

interface TeamSearchListProps {
    teams: Team[];
    enabledSearch?: boolean;
    actionButton?: string;
    action?: (team: Team) => void;
}

const TeamSearchList: FC<TeamSearchListProps> = ({
    teams,
    enabledSearch = true,
    actionButton,
    action,
}) => {
    const [filter, setFilter] = useState("");

    let filtered = teams;
    if (filter) {
        filtered = teams.filter((u) => u.name.includes(filter));
    }

    return (
        <div>
            {enabledSearch && (
                <FormControl
                    type="text"
                    placeholder="Find teams"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            )}
            <ListGroup
                className="m-2"
                style={{ maxHeight: 500, overflowY: "auto" }}
            >
                {filtered.map((t) => (
                    <ListGroup.Item key={t.id}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>{t.name}</div>
                            {actionButton && (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => {
                                        if (action) {
                                            action(t);
                                        }
                                    }}
                                >
                                    {actionButton}
                                </Button>
                            )}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default TeamSearchList;
