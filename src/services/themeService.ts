import { IAuth } from "../interfaces/AuthInterface";
import { ITheme } from "../interfaces/ThemeInterface";
import store from "../redux/store";

// getCurrentTheme : Gets the users current theme
export const getCurrentTheme = () => {
  const currUser: IAuth = store.getState().auth.user as IAuth;
  if (!(currUser?.themeAccent && currUser?.preferredTheme))
    return { accent: "#d94c68", theme: "dark" } as ITheme;
  return {
    accent: currUser.themeAccent,
    theme: currUser.preferredTheme,
  } as ITheme;
};

// getAvailableThemes : Returns all available UI Themes
export const getAvailableThemes = () => {
  const themes: ITheme[] = [
    { accent: "#d94c68", theme: "dark" },
    { accent: "#8ec484", theme: "dark" },
    { accent: "#6728ff", theme: "dark" },
    { accent: "#ff4828", theme: "dark" },
  ];
  return themes;
};

export const SLATE_LIGHT_DARK = "#333232";
export const SLATE_TEXT_SECONDARY = "#999ba2";
export const SLATE_TEXT_MAIN = "#dee0e4";
