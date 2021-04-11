import React, { useState } from "react";

const ThemeContext = React.createContext();

export const themes = {
  light: {
    type: "light",
    fontColor: "#2b2c38",
    background: "#f4f7f9",
  },
  dark: {
    type: "dark",
    fontColor: "#dcdcdc",
    background: "#2b2c38",
  },
};

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
