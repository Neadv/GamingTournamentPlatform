import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import categoryApi from "api/categoryApi";
import { AxiosError } from "axios";
import { Category } from "models/Category";
import errorService from "services/errorService";

export interface CategoryState {
    categories: Category[];
    category: Category | null;
    isLoading: boolean;
    errors: string[];
}

const initialState: CategoryState = {
    categories: [],
    category: null,
    isLoading: false,
    errors: [],
};

const loadCategories = createAsyncThunk(
    "category/loadCategories",
    async (_, thunkApi) => {
        try {
            const categories = await categoryApi.loadCategories();
            return categories;
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const loadCategoryById = createAsyncThunk(
    "category/loadCategoryById",
    async (categoryId: number, thunkApi) => {
        try {
            const category = await categoryApi.loadCategoryById(categoryId);
            return category;
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const createCategory = createAsyncThunk(
    "category/createCategory",
    async (category: Category, thunkApi) => {
        try {
            await categoryApi.createCategory(category);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (category: Category, thunkApi) => {
        try {
            await categoryApi.updateCategory(category);
        } catch (e) {
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(
                errorService.getErrorMessagesFromError(error)
            );
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {
        createNewCategory: (state) => {
            state.category = {
                id: 0,
                name: "",
                description: "",
                allowCreatingTeams: false,
                allowOrganizeCompetitions: false,
                children: [],
            };
        },
    },
    extraReducers: {
        [loadCategories.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [loadCategories.fulfilled.type]: (
            state,
            payload: PayloadAction<Category[]>
        ) => {
            state.isLoading = false;
            state.categories = payload.payload;
        },
        [loadCategories.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
        [loadCategoryById.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [loadCategoryById.fulfilled.type]: (
            state,
            payload: PayloadAction<Category>
        ) => {
            state.isLoading = false;
            state.category = payload.payload;
        },
        [loadCategoryById.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
        [createCategory.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [createCategory.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [createCategory.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
        [updateCategory.pending.type]: (state) => {
            state.isLoading = true;
            state.errors = [];
        },
        [updateCategory.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [updateCategory.rejected.type]: (
            state,
            payload: PayloadAction<string[]>
        ) => {
            state.isLoading = false;
            state.errors = payload.payload;
        },
    },
});

export const categoryActions = {
    ...categorySlice.actions,
    loadCategories,
    loadCategoryById,
    createCategory,
    updateCategory,
};

export default categorySlice.reducer;
