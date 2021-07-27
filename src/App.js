//Dependencies
import React, { useState, useEffect } from "react";

//Styles
import "./styles.css";

//Components
import Header from "./assets/components/Header/Header";
import Searchbar from "./assets/components/Searchbar/Searchbar";
import Results from "./assets/components/Results/Results";

//App Context
import AppProvider from "./assets/contexts/AppContext";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function setTheme() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    updateThemeColors(isDarkMode);
  }, [isDarkMode]);

  return (
    <AppProvider>
    <main>
      <Header isDark={isDarkMode} onThemeChange={setTheme} />
      <Searchbar />
      <Results/> 
    </main>
    </AppProvider>
  );
}

function updateThemeColors(isDarkMode) {
  let root = document.documentElement;

  if (isDarkMode) {
    root.style.setProperty("--bkgd-color", "var(--dark-bkgd-color)");
    root.style.setProperty("--font-color", "var(--dark-font-color)");
  } else {
    root.style.setProperty("--bkgd-color", "var(--light-bkgd-color)");
    root.style.setProperty("--font-color", "var(--light-font-color)");
  }
}

