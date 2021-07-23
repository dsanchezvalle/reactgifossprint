import "./Results.css";
import { gifList } from "../../data.js";

export default function Results() {
  return (
    <section className="Results">
      <p className="Results__Title">Search results</p>
      <section className="Results__Grid" id="results">
        {gifList.map((gif) => {
          return (
            <img
              className="Results__Card"
              src={gif.url}
              alt={`gif ${gif.id}`}
            />
          );
        })}
      </section>
    </section>
  );
}
