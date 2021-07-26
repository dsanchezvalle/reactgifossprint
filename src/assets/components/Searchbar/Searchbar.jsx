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
    setUserInput(e.target.innerHTML); 
    setQueryInput(e.target.innerHTML);
    setGifList([]);
    setShowSuggestions(false);
    setSuggestionList([]);
  }
  
  return (
    <section className="Searchbar">
      <p className="Searchbar__Welcome">
        Get inspired and find the best <span>GIFS!</span>
      </p>
      <img
        className="Searchbar__Image"
        src= {URLS.publicPath + "/images/header.png"}
        alt="People smiling inviting you to search gifs"
      />
      <div className="Searchbar__Wrapper">
        <div className="Searchbar__Query">
          <input
            className="Searchbar__Input"
            type="text"
            placeholder="Search gifs"
            onChange={(e)=>handleInputChange(e.target.value)}
            value={userInput}
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
          {suggestionList.map(suggestionItem => <div onClick={handleSuggestionClick} className="Searchbar__SuggestionItem">{suggestionItem.name}</div>)}
        </div>
      </div>
    </section>
  );
}
