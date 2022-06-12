import { Category } from "models/Category";
import api from ".";

function loadCategories(): Promise<Category[]> {
    return api.get("category").then((response) => response.data);
}

function loadCategoryById(id: number): Promise<Category> {
    return api.get("category/" + id).then((response) => response.data);
}

function createCategory(category: Category): Promise<void> {
    return api.post("category", category);
}

function deleteCategory(categoryId: number): Promise<void> {
    return api.delete("category/" + categoryId);
}

function updateCategory(category: Category): Promise<void> {
    return api.put("category/" + category.id, category);
}

export default {
    loadCategories,
    loadCategoryById,
    createCategory,
    deleteCategory,
    updateCategory,
};
