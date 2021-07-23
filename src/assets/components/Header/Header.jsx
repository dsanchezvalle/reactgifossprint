import "./Header.css";
import {URLS} from '../../constants'

export default function Header({ isDark, onThemeChange }) {
  let logoPath = URLS.publicPath + (isDark ? `/images/logo-dark.png` : `/images/logo.png`)
  return (
    <header className="Header">
      <img
        src={logoPath}
        alt="GIFOS logo"
      />
      <button onClick={() => onThemeChange()} className="Header__ThemeButton">
        {isDark ? "LIGHT" : "DARK"} MODE
      </button>
    </header>
  );
}