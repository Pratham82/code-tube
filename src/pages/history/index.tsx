import "styles/home.scss";
import useTheme from "hooks/useTheme";
import Loader from "assets/icons/Loader";
import usePlayList from "hooks/usePlaylists";
import { removeFromPredefinedPlaylist } from "services/common";
import { CLEAR_HISTORY, HISTORY } from "types/playlists";
import VideoCard from "components/video-card";

export default function Liked() {
  const {
    theme: { currentTheme },
  } = useTheme();
  const { history, loading, dispatchPlaylist } = usePlayList();
  const handleClearHistory = () =>
    removeFromPredefinedPlaylist(
      "all",
      dispatchPlaylist,
      CLEAR_HISTORY,
      HISTORY,
      currentTheme,
    );

  return (
    <main className={`${currentTheme}main`}>
      <section>
        <div className="flex text-center justify-between mb-20">
          <h5 className="h5 pl-8">User history: {history.length}</h5>
          <h3 className="h5 pr-8">
            {history.length ? (
              <button
                type="button"
                className={`${currentTheme}clear-all-btn`}
                onClick={() => handleClearHistory()}
              >
                Clear all
                <i className="far fa-times pl-10" />
              </button>
            ) : null}
          </h3>
        </div>
        {loading ? (
          <Loader type={currentTheme === "dark-" ? "dark" : "light"} />
        ) : (
          <div className="flex flex-wrap">
            {history.map((data: any) => (
              <VideoCard cardData={data} key={data.title} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
