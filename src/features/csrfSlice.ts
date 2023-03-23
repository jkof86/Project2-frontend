import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import csrfClient from "../util/csrfClient";

interface CsrfState {
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CsrfState = {
  token: null,
  status: "idle",
  error: null,
};

export const fetchCsrfToken = createAsyncThunk("csrf/fetchToken", async () => {
  const response = await csrfClient.get("/csrf");
  const csrfToken = response.data.token;

  return csrfToken;
});

const csrfSlice = createSlice({
  name: "csrf",
  initialState,
  reducers: {
    updateCsrfToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCsrfToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
        state.error = null;
      })
      .addCase(fetchCsrfToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch CSRF token";
      });
  },
});
export const { updateCsrfToken } = csrfSlice.actions;
export default csrfSlice.reducer;
