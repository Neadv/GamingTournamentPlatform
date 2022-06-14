import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { FC, useEffect } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Routes } from "router/Routes";
import { categoryActions } from "store/reducers/categorySlice";
import { getCategories } from "store/selectors/categorySelectors";

const CategoryList: FC = () => {
    const categories = useAppSelector((s) => getCategories(s.category));
    const dispatch = useAppDispatch();

    const { user } = useAppSelector((s) => s.account);
    const isAdmin = user?.roles.includes("Admin") === true;

    useEffect(() => {
        dispatch(categoryActions.loadCategories());
    }, []);

    return (
        <Card>
            <Card.Body>
                <div></div>
                <ListGroup>
                    {categories.map((c) => (
                        <ListGroup.Item key={c.id} action>
                            <div className="d-flex justify-content-between">
                                <div>{c.name}</div>
                                {isAdmin && (
                                    <div>
                                        <Button variant="danger me-2" size="sm">
                                            Delete
                                        </Button>
                                        <Link
                                            to={Routes.EditCategory + c.id}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default CategoryList;
