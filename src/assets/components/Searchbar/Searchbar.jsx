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
  const {setGifList, setQueryInput, setErrorMessage} = useContext(AppContext);
  const [userInput, setUserInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleSearchButton(){
    setQueryInput(userInput);
    setGifList([]);
    setShowSuggestions(false);
    setSuggestionList([]);
    setErrorMessage('');
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
    setErrorMessage('');
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
        setErrorMessage("Whoops! We got an error while bringing your suggestions. Try again.")
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
      if (!showSuggestions) return;
    }
      setGifList([]);
      setShowSuggestions(false);
      setSuggestionList([]);
      setErrorMessage('');
  }

  function handleKeyDown(e){
    if(e.key === "Enter"){
      setUserInput(e.target.value); 
      setQueryInput(e.target.value);
      setGifList([]);
      setShowSuggestions(false);
      setSuggestionList([]);
      setErrorMessage('');
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
      <div className={`Searchbar__Wrapper ${(showSuggestions && suggestionList.length>0)&&'Searchbar__Wrapper-With-Suggestions'}`}>
        <div className="Searchbar__Query">
          <input
            id="Searchbar__Input"
            className={`Searchbar__Input ${(showSuggestions && suggestionList.length>0)&&'Searchbar__Icon'}`}
            type="text"
            placeholder="Search gifs"
            autoComplete="off"
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
        <div className={(showSuggestions && suggestionList.length>0)&&"Searchbar__SuggestionsWrapper"}>
        <div className={(showSuggestions && suggestionList.length>0)&&"Searchbar__Suggestions"}>
          {suggestionList.map(suggestionItem => <div key={`k-${suggestionItem.name}`} onClick={handleSuggestionClick} className="Searchbar__SuggestionItem">{suggestionItem.name}</div>)}
        </div>
        </div>
      </div>
    </section>
  );
}
