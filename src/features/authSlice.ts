import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJwt } from "../util/getJwt";
import { AxiosError } from "axios";
import apiClient from "../util/apiClient";

interface AuthState {
  username: string | null;
  email: string | null;
  jwt: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  username: null,
  email: null,
  jwt: null,
  isAuthenticated: !!getJwt(),
  status: "idle",
  error: null,
};

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload) => {
    try {
      const response = await apiClient.post("/auth/register", payload);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      return err.response?.data;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload) => {
    try {
      const response = await apiClient.post("/auth/login", payload);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      return err.response?.data;
    }
  }
);

export const autoLogin = createAsyncThunk("auth/autoLogin", async () => {
  const jwt = getJwt();
  if (!jwt) {
    throw new Error("No JWT token found");
  }

  try {
    const response = await apiClient.get("/auth/user", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return { ...response.data, jwt };
  } catch (error) {
    console.log(error);
    const err = error as AxiosError;
    return err.response?.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.username = null;
      state.email = null;
      state.jwt = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("jwt");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action);

        if (action.payload.httpStatus) {
          state.status = "failed";
          state.error = action.payload;
        } else {
          state.status = "succeeded";
          state.error = null;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);
        if (action.payload.httpStatus) {
          state.status = "failed";
          state.error = action.payload;
        } else {
          state.status = "succeeded";
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.jwt = action.payload.accessToken;
          state.error = null;
          localStorage.setItem("jwt", action.payload.accessToken);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(autoLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        if (action.payload.httpStatus) {
          state.status = "failed";
          state.error = action.payload;
        } else {
          state.status = "succeeded";
          state.username = action.payload.username;
          state.email = action.payload.email;
          state.jwt = action.payload.jwt;
          state.error = null;
        }
      })
      .addCase(autoLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
