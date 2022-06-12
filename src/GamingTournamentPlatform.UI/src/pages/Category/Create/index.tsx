import CategoryEditor from "components/CategoryEditor";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Category } from "models/Category";
import React, { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Routes } from "router/Routes";
import { categoryActions } from "store/reducers/categorySlice";

const CreateCategory: FC = () => {
    const { category } = useAppSelector((s) => s.category);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(categoryActions.createNewCategory());
    }, []);

    const createCategory = (category: Category) => {
        dispatch(categoryActions.createCategory(category));
        navigate(Routes.Home);
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">
                    Create new Category
                </Card.Title>
                <div className="mt-3">
                    {category && (
                        <CategoryEditor
                            category={category}
                            save={createCategory}
                            saveButtonText={"Create"}
                        />
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default CreateCategory;
