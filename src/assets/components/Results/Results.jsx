//Styles
import "./Results.css";
//Constants
import {URLS} from '../../constants'
//Context
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function Results() {
  const {gifList, errorMessage} = useContext(AppContext);
  return (
    <section className="Results">
      <p className="Results__Title">Search results</p>
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
