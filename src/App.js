//Dependencies
import React, { useState, useEffect } from "react";

//Styles
import "./styles.css";

//Components
import Header from "./components/Header/Header";
import Searchbar from "./components/Searchbar/Searchbar";
import Results from "./components/Results/Results";

//App Context
import AppProvider from "./contexts/AppContext";

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
  let selectedTheme = isDarkMode ? 'dark':'light';
  root.style.setProperty("--bkgd-color", `var(--${selectedTheme}-bkgd-color)`);
  root.style.setProperty("--font-color", `var(--${selectedTheme}-font-color)`);
}

