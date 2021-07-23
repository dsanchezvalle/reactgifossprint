import "./Searchbar.css";
import { ReactComponent as SearchIcon } from "../../images/search_icon.svg";
import {URLS} from '../../constants'

export default function Searchbar() {
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
        />
        <button className="Searchbar__Btn">
          {" "}
          <SearchIcon />{" "}
        </button>
      </div>
    </section>
  );
}
