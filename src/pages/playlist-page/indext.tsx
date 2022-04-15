import usePlayList from "hooks/usePlaylists";
import useTheme from "hooks/useTheme";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "assets/icons/Loader";
import { removePlaylist } from "services/playlist";
import { REMOVE_PLAYLIST } from "types/playlists";
import VideoCardExpanded from "components/video-card-expanded";

const initialPlaylist = {
  _id: "",
  videos: [],
  playlistName: "",
  description: "",
};
export default function PlaylistPage() {
  const [activePLaylist, setActivePlaylist] = useState(initialPlaylist);
  const { playlists, loading, dispatchPlaylist } = usePlayList();
  const { playlistId } = useParams();
  const {
    theme: { currentTheme },
  } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const [playlist] = playlists.filter(
      ({ _id: id }: any) => id === playlistId,
    );
    setActivePlaylist(playlist);
  }, [playlists, playlistId]);
  const deleteHandler = () => {
    removePlaylist(playlistId, dispatchPlaylist, REMOVE_PLAYLIST, currentTheme);
    navigate("/playlists");
  };

  return (
    <main className={`${currentTheme}main`}>
      <section>
        {loading ? (
          <Loader type={currentTheme === "dark-" ? "dark" : "light"} />
        ) : (
          <div className="flex-col">
            <div className="flex mt-10 mb-14 mr-10 ml-10">
              <h1>
                {activePLaylist.playlistName} videos:{" "}
                {activePLaylist.videos && activePLaylist.videos.length}
              </h1>
              <button
                type="button"
                className={`${currentTheme}delete-playlist-btn`}
                disabled={loading}
                onClick={deleteHandler}
              >
                <i className="far fa-trash" />
              </button>
            </div>
            <div className="flex-col ml-4 mr-10">
              {activePLaylist.videos &&
                activePLaylist.videos.map((data: any) => (
                  <VideoCardExpanded cardData={data} playlistId={playlistId} />
                ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
