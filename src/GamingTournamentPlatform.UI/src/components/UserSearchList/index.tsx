import { User } from "models/User";
import React, { FC, useState } from "react";
import { Button, FormControl, ListGroup } from "react-bootstrap";

interface UserSearchListProps {
    users: User[];
    enabledSearch?: boolean;
    actionButton?: string;
    action?: (user: User) => void;
}

const UserSearchList: FC<UserSearchListProps> = ({
    users,
    enabledSearch = true,
    actionButton,
    action,
}) => {
    const [userFilter, setUserFilter] = useState("");

    let filteredUsers = users;
    if (userFilter) {
        filteredUsers = users.filter(
            (u) =>
                u.userName.includes(userFilter) || u.email.includes(userFilter)
        );
    }

    return (
        <div>
            {enabledSearch && (
                <FormControl
                    type="text"
                    placeholder="Find users"
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                />
            )}
            <ListGroup
                className="m-2"
                style={{ maxHeight: 500, overflowY: "auto" }}
            >
                {filteredUsers.map((u) => (
                    <ListGroup.Item key={u.id}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <div>
                                    Username: <strong>{u.userName}</strong>
                                </div>
                                <div>
                                    Email: <i>{u.email}</i>
                                </div>
                            </div>
                            {actionButton && (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => {
                                        if (action) {
                                            action(u);
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

export default UserSearchList;
