//Dependencies
import React, { useState, useEffect } from "react";

//Styles
import "./styles.css";

//Components
import Header from "./assets/components/Header/Header";
import Searchbar from "./assets/components/Searchbar/Searchbar";
import Results from "./assets/components/Results/Results";

//Constants
import {URLS, API_KEY, RESULTS_LIMIT} from '../src/assets/constants'

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [gifList, setGifList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
          let fetchedData = await fetch(`${URLS.searchEndPoint}?api_key=${API_KEY}&q=dog&limit=${RESULTS_LIMIT}&offset=0&rating=g&lang=en`);
          let response = await fetchedData.json();
          let itemList = response.data;
          console.log(itemList[0].images);
          setGifList(itemList);
          }catch(err){
            setErrorMessage("Whoops! An error has occurred while we were bringing your gifs. Try again.")
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
      <Results results={gifList} error={errorMessage}/> 
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

