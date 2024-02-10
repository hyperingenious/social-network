import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, login, logout, signUp } from "../supabase/auth";

export const fetchRegister = createAsyncThunk(
  'auth/register', async function (credentials) {
    const request = await signUp(credentials)
    return request;
  }
)

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async function (credentials) {
    const request = await login(credentials);
    return request;
  }
);

export const fetchLogout = createAsyncThunk("auth/logout", async function (navigate) {
  const signOut = await logout(navigate);
  return signOut;
});

export const fetchSession = createAsyncThunk("auth/session", async function () {
  const session = await getUser();
  return session;
});

const initialState = {
  authenticated: false,
  authDetails: null,
  status: "idle",
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.authenticated = false;
      state.authDetails = null;
      state.isError = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.authenticated = true;
        state.status = 'finished'
        state.authDetails = action.payload
      })
      .addCase(fetchRegister.rejected, (state, { error }) => {
        state.status = "error";
        state.isError = error.message;
      })
      
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.authenticated = true;
        state.status = "finished";
        state.authDetails = action.payload

      })
      .addCase(fetchLogin.rejected, (state, { error }) => {
        state.status = "idle";
        state.isError = error.message;
      })

      .addCase(fetchSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.authenticated = true;
        state.status = "finished";
        state.authDetails = action.payload
      })
      .addCase(fetchSession.rejected, (state, { error }) => {
        state.status = "idle";
        state.isError = error.message;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.authenticated = false;
        state.status = "finished";
      })
      .addCase(fetchLogout.rejected, (state, { error }) => {
        state.status = "idle";
        state.isError = error.message;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthState } = authSlice.actions;