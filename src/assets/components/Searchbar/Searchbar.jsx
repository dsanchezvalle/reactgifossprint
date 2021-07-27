//Dependencies
import { useContext, useEffect, useState } from "react";

//Styles
import "./Searchbar.css";

//Context
import { AppContext } from "../../contexts/AppContext";

//Constants and Icons
import { ReactComponent as SearchIcon } from "../../images/search_icon.svg";
import { ReactComponent as CloseIcon } from "../../images/close_icon.svg";
import {URLS, API_KEY, RESULTS_LIMIT} from '../../constants'

export default function Searchbar() {
  const [suggestionList, setSuggestionList] = useState([]);
  const {setGifList, setQueryInput} = useContext(AppContext);
  const [userInput, setUserInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleSearchButton(){
    setQueryInput(userInput);
    setGifList([]);
    setShowSuggestions(false);
    setSuggestionList([]);
  }

  function handleInputChange(input){
    setUserInput(input);
    setShowSuggestions(true);
    if(input.length===0){
      setSuggestionList([]);
    }
  }
  
  function handleCloseSuggestionsButton(){
    setQueryInput('');
    setUserInput('');
    setGifList([]);
    setShowSuggestions(false);
    setSuggestionList([]);
  }

  useEffect(()=>{
    if(userInput.length>0 && showSuggestions){
    let getSuggestions = async()=>{
    try{
      let fetchedData = await fetch(`${URLS.searchEndPoint}/tags?api_key=${API_KEY}&q=${userInput}&limit=${RESULTS_LIMIT}&offset=0&rating=g&lang=en`);
      let response = await fetchedData.json();
      let itemList = response.data;
      setSuggestionList(itemList);
      }catch(err){
        //PENDING: setErrorMessage("Whoops! We got an error while bringing your gifs. Try again.")
      }finally{
        //Clean up
      } 
    }
    getSuggestions();}
  }, [userInput, showSuggestions]);

  function handleSuggestionClick(e){
    if(e.target.id !== "Searchbar__Input"){
      setUserInput(e.target.innerHTML); 
      setQueryInput(e.target.innerHTML);
    } else if(e.target.id === "Searchbar__Input"){
      setUserInput(e.target.value); 
      setQueryInput(e.target.value);
    }
      setGifList([]);
      setShowSuggestions(false);
      setSuggestionList([]);
  }

  function handleKeyDown(e){
    if(e.key === "Enter"){
      setUserInput(e.target.value); 
      setQueryInput(e.target.value);
      setGifList([]);
      setShowSuggestions(false);
      setSuggestionList([]);
    }
  }
  
  return (
    <section className="Searchbar">
      <h2 className="Searchbar__Welcome">
        Get inspired and find the best <span>GIFS!</span>
      </h2>
      <img
        className="Searchbar__Image"
        src= {URLS.publicPath + "/images/header.png"}
        alt="People smiling inviting you to search gifs"
      />
      <div className="Searchbar__Wrapper">
        <div className="Searchbar__Query">
          <input
            id="Searchbar__Input"
            className={`Searchbar__Input ${(showSuggestions && userInput.length>0)&&'Searchbar__Icon'}`}
            type="text"
            placeholder="Search gifs"
            onChange={(e)=>handleInputChange(e.target.value)}
            value={userInput}
            onClick={handleSuggestionClick}
            onKeyDown={handleKeyDown}
          />
          {(showSuggestions && userInput.length>0)? 
          (
            <button onClick={handleCloseSuggestionsButton} className="Searchbar__CloseSuggestions">
              <CloseIcon />
            </button>
          ):(
            <button onClick={handleSearchButton} className="Searchbar__Btn">
              <SearchIcon />
            </button>
          )          
          }
          
            
        </div>  
        <div className="Searchbar__Suggestions">
          {suggestionList.map(suggestionItem => <div key={`k-${suggestionItem.name}`} onClick={handleSuggestionClick} className="Searchbar__SuggestionItem">{suggestionItem.name}</div>)}
        </div>
      </div>
    </section>
  );
}
