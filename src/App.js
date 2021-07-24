//Dependencies
import React, { useState, useEffect } from "react";

//Styles
import "./styles.css";

//Components
import Header from "./assets/components/Header/Header";
import Searchbar from "./assets/components/Searchbar/Searchbar";
import Results from "./assets/components/Results/Results";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [gifList, setGifList] = useState([]);

  function setTheme() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    updateThemeColors(isDarkMode);
  }, [isDarkMode]);

  useEffect(()=>{
    if (gifList.length === 0){
      let getGifs = async()=>{
        try{
          let fetchedData = await fetch('https://api.giphy.com/v1/gifs/search?api_key=PJIoXPZ6kGC515c9JVIiurxRBwYy5RJm&q=dog&limit=12&offset=0&rating=g&lang=en');
          let response = await fetchedData.json();
          let itemList = response.data;
          console.log(itemList)
          setGifList(itemList);
          }catch(err){
            console.log(err);
          }finally{
            //Clean up
          } 
      }
      getGifs();
    }
    
  }, [gifList]);

  return (
    <main>
      <Header isDark={isDarkMode} onThemeChange={setTheme} />
      <Searchbar />
      <Results results={gifList} /> 
    </main>
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

