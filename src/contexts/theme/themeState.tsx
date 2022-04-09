import { useReducer } from "react";
import ThemeContext from ".";
import themeReducer from "./themeReducer";

const initialData = {
  isDarkMode: false,
  mode: "light",
  expandedSidebar: true,
  currentTheme: "",
};
export default function ThemeProvider({ children }: any) {
  const [theme, dispatchTheme] = useReducer(themeReducer, initialData);
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ThemeContext.Provider value={{ theme, dispatchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
