import { configureStore } from "@reduxjs/toolkit";
import lobbyReducer from "../features/LobbySlice";

export const store = configureStore({
    reducer: {
        lobbies: lobbyReducer
    }
}); 

export type RootState = ReturnType<typeof store.getState>