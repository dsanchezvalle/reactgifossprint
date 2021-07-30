//Styles
import "./Results.css";
//Constants
import {URLS} from '../../constants'
//Context
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Results({welcomeMessage}) {
  //Context
  const {gifList, errorMessage, isLoading} = useContext(AppContext);

  return (
    <section className="Results">
      <h3 className="Results__Title">Search results</h3>
      {isLoading?<div className="Results__Loader"></div>:''}
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
        {errorMessage.length === 0 ? (
          <section className="Results__Grid" id="results">
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
