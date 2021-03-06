//Styles
import "./Results.css";
//Constants
import {URLS, RESULTS_LIMITS} from '../../assets/constants'
//Context
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Results({welcomeMessage}) {
  //Context
  const {
    gifList, 
    errorMessage, 
    isLoading, 
    queryInput, 
    resultsLimit, 
    setResultsLimit, 
    setGifList, 
    setQueryInput
  } = useContext(AppContext);
  
  //Results limit handler
  function handleResultsLimit(e){
    setResultsLimit(e.target.value);
    setQueryInput(queryInput);
    setGifList([]);
  }

  return (
    <section className="Results">
      <section className="Results__Header">
        {/* Displaying a tag with the queryInput if exists */}
        <h3 className="Results__Title">Search results {
          gifList.length>0 && 
          queryInput.length>0 && 
          [<span key='forText'>for </span>, <span key='inputTag' className="Results__InputQuery">{queryInput}</span>]}
        </h3>
        {/* Displaying options to switch number of results */}
        <div className="Results__Quantity">
          <label className="Results__QuantityLabel" htmlFor="Results__QuantityOptions"># Results</label>
          <select 
            value={resultsLimit} 
            onChange={handleResultsLimit}
            className="Results__QuantityOptions" 
            name="Results__QuantityOptions" 
            id="Results__QuantityOptions">
            {RESULTS_LIMITS.map((itemLimit)=><option key={`k-${itemLimit}`} value={itemLimit}>{itemLimit}</option>)}
          </select>
        </div>
      </section>  
      {/* Displaying loader while fetching */}
      {isLoading && <div className="Results__Loader"></div>}
      {/* Displaying Welcome message */}
      {(gifList.length===0 && errorMessage.length===0 && !isLoading)&&
        <section className="Results__Welcome">
          <img
                  className="Results__Card"
                  src={URLS.welcomeGif}
                  alt={`gif-error`}
                />
          <p className="Results__WelcomeText">{welcomeMessage}</p>
        </section>
      }
      {/* Displaying results or error message */}
      {errorMessage.length === 0 ? (
        <section className={`Results__Grid ${gifList.length>0?'Results__Grid-BorderTop':undefined}`} id="results">
          {gifList.map((gif) => {
            return (
              <img
                key={`k-${gif.id}`}
                className="Results__Card"
                src={gif.images.fixed_height.url}
                alt={`gif ${gif.id}`}
              />
            );
          })}
        </section>
      ) : (
        <section className="Results__Error">
          <img
                  className="Results__Card"
                  src={URLS.errorGif}
                  alt={`gif-error`}
                />
          <p className="Results__ErrorText">{errorMessage}</p>
        </section>
      )}              
    </section>
  );
}