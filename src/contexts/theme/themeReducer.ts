import { TOGGLE_SIDEBAR, TOGGLE_THEME } from "types/theme";
import { getTheme } from "utils";

export default function themeReducer(theme: any, { type }: any) {
  switch (type) {
    case TOGGLE_THEME:
      return {
        ...theme,
        isDarkMode: !theme.isDarkMode,
        currentTheme: getTheme(theme.isDarkMode),
      };

    case TOGGLE_SIDEBAR:
      return {
        ...theme,
        expandedSidebar: !theme.expandedSidebar,
      };
    default:
      return {
        ...theme,
      };
  }
}
