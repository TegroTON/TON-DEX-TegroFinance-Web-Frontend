import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ThemeState {
  theme: "light-mode" | "dark-mode";
}

const initialState: ThemeState = {
  theme: "dark-mode",
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setLightMode: (state) => {
      state.theme = "light-mode";
    },
    setDarkMode: (state) => {
      state.theme = "dark-mode";
    },
    switchTheme: (state) => {
      if (state.theme === "light-mode") {
        state.theme = "dark-mode";
      } else {
        state.theme = "light-mode";
      }
    },
  },
});

export const { setLightMode, setDarkMode, switchTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme.theme;

export const themeReducer = themeSlice.reducer;
