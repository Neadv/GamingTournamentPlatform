import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducers/accountSlice";
import categoryReducer from "./reducers/categorySlice";
import teamReducer from "./reducers/teamSlice";
import userReducer from "./reducers/userSlice";

const rootReducer = combineReducers({
    account: accountReducer,
    category: categoryReducer,
    user: userReducer,
    team: teamReducer,
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

const store = setupStore();

export default store;
