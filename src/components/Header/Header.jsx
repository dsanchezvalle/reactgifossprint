//Styles
import "./Header.css";
//Constants
import {URLS} from '../../assets/constants'

export default function Header({ isDark, onThemeChange }) {
  let logoPath = URLS.publicPath + `/images/logo${isDark? '-dark':''}.png`;
  return (
    <header className="Header">
      <img
        className="Header__Logo"
        src={logoPath}
        alt="GIFOS logo"
      />
      <button onClick={() => onThemeChange()} className="Header__ThemeButton">
        {isDark ? "LIGHT" : "DARK"} MODE
      </button>
    </header>
  );
}