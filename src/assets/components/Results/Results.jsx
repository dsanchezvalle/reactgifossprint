import "./Results.css";
import {URLS} from '../../constants'
//import { gifList } from "../../data.js";

export default function Results({results, error}) {
  return (
    <section className="Results">
      <p className="Results__Title">Search results</p>
        {error.length === 0 ? (
          <section className="Results__Grid" id="results">
            {results.map((gif) => {
              return (
                <img
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
            
            <p className="Results__ErrorText">{error}</p>
          </section>
        )}             
    </section>
  );
}
