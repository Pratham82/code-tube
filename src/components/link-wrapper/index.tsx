import { Link } from "react-router-dom";

export default function LinkWrapper({ children, videoId, currentTheme }: any) {
  return (
    <Link
      to={`/video/${videoId}`}
      style={{
        color: currentTheme === "dark-" ? "#FFF" : "#000",
        fontSize: "12px",
      }}
    >
      {children}
    </Link>
  );
}
