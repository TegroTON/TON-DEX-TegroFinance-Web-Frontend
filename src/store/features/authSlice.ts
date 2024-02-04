import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    removeToken: (state) => initialState,
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { removeToken, updateToken } = authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;

export const authReducer = authSlice.reducer;
