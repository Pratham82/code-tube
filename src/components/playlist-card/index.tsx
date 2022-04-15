import useTheme from "hooks/useTheme";
import { useNavigate } from "react-router-dom";
import "styles/playlist-card.scss";

export default function PlaylistCard({ title, id, videos }: any) {
  const navigate = useNavigate();
  const {
    theme: { currentTheme },
  } = useTheme();
  return (
    <div className={`${currentTheme}playlist-card`}>
      <div className="playlist-title">
        <div className="flex-col">
          <h6 className="h5">{title}</h6>
          <h6 className="h6">
            {videos} {videos > 1 ? "videos" : "video"}
          </h6>
        </div>
      </div>
      <div className="overlay-card flex justify-center items-center">
        <button
          type="button"
          onClick={() => navigate(`/playlists/${id}`)}
          className={`${currentTheme}play-btn`}
        >
          <p>Play All</p>
          <i className="far fa-play-circle play-icon" />
        </button>
      </div>
    </div>
  );
}
