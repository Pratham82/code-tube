import "styles/home.scss";
import useTheme from "hooks/useTheme";
import Loader from "assets/icons/Loader";
import usePlayList from "hooks/usePlaylists";
import VideoCardExpanded from "components/video-card-expanded";
import { removeFromPredefinedPlaylist } from "services/common";
import { CLEAR_HISTORY, HISTORY } from "types/playlists";

export default function Liked() {
  const {
    theme: { currentTheme },
  } = useTheme();
  const { history, loading, dispatchPlaylist } = usePlayList();
  return (
    <main className={`${currentTheme}main`}>
      <section>
        <div className="flex text-center justify-between mb-20">
          <h5 className="h5 pl-8">User history: {history.length}</h5>
          <h3 className="h5 pr-8">
            <button
              type="button"
              className={`${currentTheme}clear-all-btn`}
              onClick={() =>
                removeFromPredefinedPlaylist(
                  "all",
                  dispatchPlaylist,
                  CLEAR_HISTORY,
                  HISTORY,
                  currentTheme,
                )
              }
            >
              Clear all
              <i className="far fa-times pl-10" />
            </button>
          </h3>
        </div>
        {loading ? (
          <Loader type={currentTheme === "dark-" ? "dark" : "light"} />
        ) : (
          <div className="flex flex-col flex-wrap">
            {history.map((data: any) => (
              <VideoCardExpanded cardData={data} key={data.title} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
