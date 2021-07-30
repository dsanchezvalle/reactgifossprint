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
  //States
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');

  function setTheme() {
    setIsDarkMode(!isDarkMode);
  }

  //Effect to update App Theme
  useEffect(() => {
    updateThemeColors(isDarkMode);
  }, [isDarkMode]);

  //Effect setting the Welcome message
  useEffect(()=>{
    setWelcomeMessage('Welcome to Gifos, start searching for amazing gifs.');
  },[]);

  return (
    <AppProvider>
    <main>
      <Header isDark={isDarkMode} onThemeChange={setTheme} />
      <Searchbar />
      <Results welcomeMessage={welcomeMessage}/> 
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

