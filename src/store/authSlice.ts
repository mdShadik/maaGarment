import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  isAuthenticated: boolean;
  userId: string | null;
  token: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  userId: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<{ isAuthenticated: boolean; userId: string; token: string }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.token = null;
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;
