import { createContext, useContext } from "react";

const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;