import "styles/sidebar.scss";
import { NavLink, useLocation } from "react-router-dom";
import useTheme from "hooks/useTheme";

const links = [
  {
    link: "/",
    title: "HOME",
    icon: { active: "fas fa-home-alt", inactive: "far fa-home-alt" },
  },
  // {
  //   link: "/",
  //   title: "EXPLORE",
  //   icon: { active: "fas fa-compass", inactive: "far fa-compass" },
  // },
  {
    link: "/playlists",
    title: "PLAYLISTS",
    icon: { active: "fas fa-list-alt", inactive: "far fa-list-alt" },
  },
  {
    link: "/liked",
    title: "LIKED",
    icon: { active: "fas fa-thumbs-up", inactive: "far fa-thumbs-up" },
  },
  {
    link: "/watchLater",
    title: "WATCH LATER",
    icon: { active: "fas fa-clock", inactive: "far fa-clock" },
  },
  {
    link: "/history",
    title: "HISTORY",
    icon: { active: "fas fa-history", inactive: "far fa-history" },
  },
];

export default function BottomBar() {
  const {
    theme: { currentTheme },
  } = useTheme();
  const { pathname } = useLocation();

  return (
    <div className={`${currentTheme}bottom-bar`} style={{ color: "red" }}>
      <div className="flex p-8 bottom-bar-container">
        {links.map(({ link, title, icon }) => (
          <NavLink
            to={link}
            className={({ isActive }: any) =>
              isActive
                ? `${currentTheme}active-link`
                : `${currentTheme}inactive-link`
            }
            key={link}
          >
            <div className="flex items-center p-6 text-center flex-col">
              <i
                className={`icon
                      ${pathname === link ? icon?.active : icon?.inactive}
                    `}
              />
              <p className="p-4">{title}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
