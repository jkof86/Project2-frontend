import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../features/TableSlice";

export const store = configureStore({
    reducer: {
        tables: tableReducer
    }
}); 

export type RootState = ReturnType<typeof store.getState>