import CategoryTreeView from "components/CategoryTreeView";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Category } from "models/Category";
import React, { FC, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "router/Routes";
import { tournamentActions } from "store/reducers/tournamentSlice";

const TournamentList: FC = () => {
    const { tournaments } = useAppSelector((s) => s.tournament);
    const dispatch = useAppDispatch();

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );

    useEffect(() => {
        dispatch(tournamentActions.loadTournaments());
    }, []);

    const filteredTournaments = selectedCategory
        ? tournaments.filter((t) => t.categoryId === selectedCategory.id)
        : tournaments;

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
                        {filteredTournaments.map((t) => (
                            <ListGroup.Item
                                key={t.id}
                                as={Link}
                                to={Routes.TournamentInfo + t.id}
                                action
                            >
                                {t.title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </Card.Body>
        </Card>
    );
};

export default TournamentList;
