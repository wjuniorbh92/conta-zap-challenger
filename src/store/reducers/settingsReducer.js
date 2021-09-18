import indigo from "@material-ui/core/colors/indigo";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { createSlice } from '@reduxjs/toolkit';

const themeConfig = {
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: indigo,
    secondary: green,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
};

const defaultTheme = themeConfig;

export const settings = createSlice({
  name: 'settings',
  initialState: {
    theme: defaultTheme,
    darkMode: false,
    colorsSwaped: false
  },
  reducers: {
    toggleThemeMode: (state, action) => {
      if (action.payload) { //darknode set
        state.darkMode = true;
        state.theme = {
          ...themeConfig,
          palette: {
            ...themeConfig.palette,
            primary: state.theme.palette.primary,
            secondary: state.theme.palette.secondary,
            type: "dark"
          }
        };
      } else {
        state.darkMode = false;
        state.theme = {
          ...themeConfig,
          palette: {
            ...themeConfig.palette,
            primary: state.theme.palette.primary,
            secondary: state.theme.palette.secondary
          }
        };
      }

      state.value = action.payload;
    },

  },
});

export const { toggleThemeMode } = settings.actions;

export const isDarkMode = state => state.settings.darkMode;

export const getTheme = state => state.settings.theme;

export default settings.reducer;