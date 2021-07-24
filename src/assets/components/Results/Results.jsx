import "./Results.css";
//import { gifList } from "../../data.js";

export default function Results({results}) {
  return (
    <section className="Results">
      <p className="Results__Title">Search results</p>
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
    </section>
  );
}
