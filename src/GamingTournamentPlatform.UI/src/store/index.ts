import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducers/accountSlice";

const rootReducer = combineReducers({
    account: accountReducer,
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
