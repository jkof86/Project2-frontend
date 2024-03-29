import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import csrfSlice from "../features/csrfSlice";
import authSlice from "../features/authSlice";
import lobbyReducer from "../features/LobbySlice";
import tableSlice from "../features/TableSlice";
export const store = configureStore({
  reducer: {
    lobbies: lobbyReducer,
    auth: authSlice,
    csrf: csrfSlice,
    tables: tableSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
