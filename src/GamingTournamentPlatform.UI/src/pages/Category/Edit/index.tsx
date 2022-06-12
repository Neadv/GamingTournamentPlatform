import CategoryEditor from "components/CategoryEditor";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Category } from "models/Category";
import React, { FC, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router/Routes";
import { categoryActions } from "store/reducers/categorySlice";

const EditCategory: FC = () => {
    const { category } = useAppSelector((s) => s.category);
    const dispatch = useAppDispatch();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(categoryActions.loadCategoryById(Number(id)));
    }, [id]);

    const updateCategory = (category: Category) => {
        dispatch(categoryActions.updateCategory(category));
        navigate(Routes.Home);
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-center">
                    Edit Category #{id}
                </Card.Title>
                <div className="mt-3">
                    {category && (
                        <CategoryEditor
                            category={category}
                            save={updateCategory}
                            saveButtonText={"Save"}
                        />
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default EditCategory;
