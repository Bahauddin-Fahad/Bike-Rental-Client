import { createSlice } from "@reduxjs/toolkit";

type TThemeState = {
  theme: string | null;
};

const initialState: TThemeState = {
  theme: localStorage.getItem("theme") || "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
