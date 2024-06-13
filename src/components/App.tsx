import { BrowserRouter as Router } from "react-router-dom";
import { Aside } from "./Aside/Aside";
import { Main } from "./Main/Main";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import "../index.scss";

export interface ThemeColors {
  primary: string;
  secondary: string;
}

export type SetColorsState = (
  colors: (prevColors: ThemeColors) => ThemeColors,
) => void;

export type ThemeState = "dark" | "white";

export type SetThemeState = (theme: ThemeState) => void;

interface ThemeContextType {
  theme: ThemeState;
  setTheme: Dispatch<SetStateAction<ThemeState>>;
  colors: ThemeColors;
  setColors: Dispatch<SetStateAction<ThemeColors>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const App = () => {
  function initialTheme(): ThemeState {
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || theme === "white") return theme;
    return "dark";
  }

  const [theme, setTheme] = useState<ThemeState>(initialTheme);

  const [colors, setColors] = useState<ThemeColors>({
    primary: "#1a1a1a",
    secondary: "#ffffff",
  });

  return (
    <Router>
      <ThemeContext.Provider value={{ theme, setTheme, colors, setColors }}>
        <Aside />
        <Main />
      </ThemeContext.Provider>
    </Router>
  );
};
