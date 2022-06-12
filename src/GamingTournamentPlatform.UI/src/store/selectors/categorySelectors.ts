import { Category } from "models/Category";
import { CategoryState } from "store/reducers/categorySlice";

export function getTeamCategories(state: CategoryState): Category[] {
    return getListCategories(state.categories).filter(
        (c) => c.allowCreatingTeams
    );
}

export function getCategories(state: CategoryState): Category[] {
    return getListCategories(state.categories);
}

function getListCategories(categories: Category[]): Category[] {
    const result: Category[] = [];

    categories.forEach((cat) => {
        result.push(cat);
        result.push(...getListCategories(cat.children));
    });

    return result;
}
