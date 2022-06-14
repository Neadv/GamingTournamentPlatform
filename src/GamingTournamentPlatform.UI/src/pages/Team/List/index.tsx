import CategoryTreeView from "components/CategoryTreeView";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Category } from "models/Category";
import React, { FC, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "router/Routes";
import { teamActions } from "store/reducers/teamSlice";

const TeamList: FC = () => {
    const { teams } = useAppSelector((s) => s.team);
    const dispatch = useAppDispatch();

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );

    useEffect(() => {
        dispatch(teamActions.loadTeams());
    }, []);

    const filteredTeams = selectedCategory
        ? teams.filter((t) => t.categoryId === selectedCategory.id)
        : teams;

    return (
        <Card>
            <Card.Body className="row">
                <div className="col-3">
                    <CategoryTreeView
                        selectedCategory={selectedCategory}
                        select={(cat) => setSelectedCategory(cat)}
                    />
                </div>
                <div className="col">
                    {selectedCategory && (
                        <div className="mb-4">
                            Filtered category: {selectedCategory.name}
                        </div>
                    )}
                    <ListGroup>
                        {filteredTeams.map((t) => (
                            <ListGroup.Item
                                key={t.id}
                                as={Link}
                                to={Routes.TeamInfo + t.id}
                                action
                            >
                                {t.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </Card.Body>
        </Card>
    );
};

export default TeamList;
