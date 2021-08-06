//Dependencies
import { useContext, useEffect, useState } from "react";

//Styles
import "./Searchbar.css";

//Context
import { AppContext } from "../../contexts/AppContext";

//Constants and Icons
import { ReactComponent as SearchIcon } from "../../images/search_icon.svg";
import { ReactComponent as CloseIcon } from "../../images/close_icon.svg";
import {URLS, API_KEY, SUGGESTIONS_LIMIT} from '../../constants'

export default function Searchbar() {
  //States and Context
  const {setGifList, setQueryInput, setErrorMessage} = useContext(AppContext);
  const [suggestionList, setSuggestionList] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  /* Handlers */
  //Search button handler
  function handleSearchButton(){
    setQueryInput(userInput);
    resetBeforeNewSearch();
  }
  //Input change handler
  function handleInputChange(input){
    setUserInput(input);
    setShowSuggestions(true);
    if(input.length===0){
      setSuggestionList([]);
    }
  }
  //Close suggestions cross handler
  function handleCloseSuggestionsButton(){
    setQueryInput('');
    setUserInput('');
    resetBeforeNewSearch();
  }

  //Handler on suggestions click
  function handleSuggestionClick(e){
    if(e.target.id !== "Searchbar__Input"){
      setUserInput(e.target.innerHTML); 
      setQueryInput(e.target.innerHTML);
    } else if(e.target.id === "Searchbar__Input"){
      setUserInput(e.target.value); 
      setQueryInput(e.target.value);
      if (!showSuggestions) return;
    }
      resetBeforeNewSearch();
  }

  //Handler when the user presses Enter key
  function handleKeyDown(e){
    if(e.key === "Enter"){
      setUserInput(e.target.value); 
      setQueryInput(e.target.value);
      resetBeforeNewSearch();
    }
  }

  //Resets gifList, showSuggestions, suggestionList and errorMessage
  function resetBeforeNewSearch(){
    setGifList([]);
    setShowSuggestions(false);
    setSuggestionList([]);
    setErrorMessage('');
  }

  //Effect to fetch suggestions list
  useEffect(()=>{
    if(userInput.length>0 && showSuggestions){
    let getSuggestions = async()=>{
    try{
      let fetchedData = await fetch(`${URLS.searchEndPoint}/tags?api_key=${API_KEY}&q=${userInput}&limit=${SUGGESTIONS_LIMIT}&offset=0&rating=g&lang=en`);
      let response = await fetchedData.json();
      let itemList = response.data;
      setSuggestionList(itemList);
      }catch(err){
        setErrorMessage("Whoops! We got an error while bringing your suggestions. Try again.")
      } 
    }
    getSuggestions();}
  }, [userInput, showSuggestions, setErrorMessage]);
  
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
      <div className={`Searchbar__Wrapper ${(showSuggestions && suggestionList.length>0)?'Searchbar__Wrapper-With-Suggestions':undefined}`}>
        <div className="Searchbar__Query">
          <input
            id="Searchbar__Input"
            className={`Searchbar__Input ${(showSuggestions && suggestionList.length>0)?'Searchbar__Icon':undefined}`}
            type="text"
            placeholder="Search gifs"
            autoComplete="off"
            onChange={(e)=>handleInputChange(e.target.value)}
            value={userInput}
            onClick={handleSuggestionClick}
            onKeyDown={handleKeyDown}
          />
          {(showSuggestions && userInput.length>0 && suggestionList.length>0)? 
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
        <div className={(showSuggestions && suggestionList.length>0)?'Searchbar__SuggestionsWrapper':undefined}>
        <div className={(showSuggestions && suggestionList.length>0)?'Searchbar__Suggestions':undefined}>
          {suggestionList.map(suggestionItem => <div key={`k-${suggestionItem.name}`} onClick={handleSuggestionClick} className="Searchbar__SuggestionItem">{suggestionItem.name}</div>)}
        </div>
        </div>
      </div>
    </section>
  );
}