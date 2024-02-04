import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DexState {
  token: string | null;
}

const initialState: DexState = {
  token: null,
};

export const dexSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    removeToken: (state) => initialState,
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { removeToken: remove, updateToken: update } = dexSlice.actions;

export const selectToken = (state: DexState) => state.token;

export const authReducer = dexSlice.reducer;
