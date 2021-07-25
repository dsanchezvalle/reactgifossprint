//Dependencies
import { useContext } from "react";

//Styles
import "./Searchbar.css";

//Context
import { AppContext } from "../../contexts/AppContext";

//Constants and Icons
import { ReactComponent as SearchIcon } from "../../images/search_icon.svg";
import {URLS} from '../../constants'

export default function Searchbar() {
  const {queryInput, setQueryInput} = useContext(AppContext);
  
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
        <input
          className="Searchbar__Input"
          type="text"
          placeholder="Search gifs"
          onChange={(e)=>setQueryInput(e.target.value)}
          value={queryInput}
        />
        <button className="Searchbar__Btn">
          {" "}
          <SearchIcon />{" "}
        </button>
      </div>
    </section>
  );
}
