import "styles/header.scss";
import useTheme from "hooks/useTheme";
import { Link } from "react-router-dom";
import { TOGGLE_SIDEBAR, TOGGLE_THEME } from "types/theme";

export default function Navbar() {
  const {
    theme: { isDarkMode, currentTheme },
    dispatchTheme,
  } = useTheme();

  return (
    <nav className={`flex justify-around items-center ${currentTheme}navbar`}>
      <div className="flex items-center branding">
        <button
          type="button"
          className={`${currentTheme}toggle-btn`}
          onClick={() =>
            dispatchTheme({
              type: TOGGLE_SIDEBAR,
            })
          }
        >
          <i className="far fa-bars" />
        </button>
        <Link to="/">
          <h4 className={`h4 ${currentTheme}brand`}>Code Tube</h4>
        </Link>
      </div>

      <div className="searchDiv">
        <input
          className={`${currentTheme}searchInput`}
          type="text"
          placeholder="Search videos..."
        />
        <i className={`fal fa-search ${currentTheme}searchIcon`} />
      </div>

      <ul className="flex items-center pages">
        <Link to="/profile" className="flex flex-col items-center">
          <li className={`${currentTheme}profile-logo`}>
            <i className="far fa-user" />
          </li>
          <li className={`${currentTheme}profile-title`}>Profile</li>
        </Link>
        <div className={`${currentTheme}toggle-theme`}>
          <button
            type="button"
            className={`${currentTheme}toggle-theme-btn`}
            onClick={() => {
              dispatchTheme({
                type: TOGGLE_THEME,
              });
            }}
          >
            <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"} />
          </button>
        </div>
      </ul>
    </nav>
  );
}
