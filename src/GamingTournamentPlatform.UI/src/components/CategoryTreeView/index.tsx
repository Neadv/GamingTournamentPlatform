import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Category } from "models/Category";
import React, { FC, useEffect } from "react";
import { categoryActions } from "store/reducers/categorySlice";
import "./CategoryTreeView.scss";

interface CategoryTreeViewProps {
    select: (cat: Category) => void;
    selectedCategory: Category | null;
}

const CategoryTreeView: FC<CategoryTreeViewProps> = ({
    select,
    selectedCategory,
}) => {
    const { categories } = useAppSelector((s) => s.category);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(categoryActions.loadCategories());
    }, []);

    const getCategory = (category: Category) => (
        <div key={category.id} className="category">
            <div
                className={`name ${
                    selectedCategory?.id === category.id ? "selected" : ""
                }`}
                onClick={() => select(category)}
            >
                {category.name}
            </div>
            <div className="ms-4">
                {category.children.map((c) => getCategory(c))}
            </div>
        </div>
    );

    return <div>{categories.map((c) => getCategory(c))}</div>;
};

export default CategoryTreeView;
