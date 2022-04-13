import "styles/video-page.scss";
import useTheme from "hooks/useTheme";
import { useParams } from "react-router-dom";
import {
  ADD_TO_HISTORY,
  ADD_TO_LIKED,
  ADD_TO_PLAYLIST,
  ADD_TO_WATCH_LATER,
  HISTORY,
  LIKES,
  PLAYLIST,
  REMOVE_LIKED,
  REMOVE_WATCH_LATER,
  WATCH_LATER,
} from "types/playlists";
import usePlayList from "hooks/usePlaylists";
import {
  addToPredefinedPlaylist,
  removeFromPredefinedPlaylist,
} from "services/common";
import { isDuplicate } from "utils";
import useVideos from "hooks/useVideos";
import { useEffect } from "react";
import { SET_SELECTED_VIDEO } from "types/videos";
import { setSelectedVideo } from "services/videos";
import Loader from "assets/icons/Loader";
import Tooltip from "components/tooltip";
import axios from "axios";

export default function VideoPage() {
  const { videoId } = useParams();
  const {
    theme: { currentTheme },
  } = useTheme();
  const { likes, watchLater, history, dispatchPlaylist } = usePlayList();

  // common duplication check
  const [isDuplicateWatchLater, isDuplicateLiked, isDuplicateHistory] = [
    watchLater,
    likes,
    history,
  ].map((entity) => isDuplicate(videoId, entity));

  const { selectedVideo, dispatchVideos, loading } = useVideos();

  const handleHistory = async () => {
    const {
      data: { video },
    } = await axios.get(`/api/video/${videoId}`);
    if (!isDuplicateHistory)
      addToPredefinedPlaylist(
        video,
        dispatchPlaylist,
        ADD_TO_HISTORY,
        HISTORY,
        currentTheme,
      );
  };

  useEffect(() => {
    setSelectedVideo(videoId, dispatchVideos, SET_SELECTED_VIDEO, currentTheme);
    handleHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = (dispatchType: string, playlistType: string) => {
    switch (playlistType) {
      case WATCH_LATER:
        return !isDuplicateWatchLater
          ? addToPredefinedPlaylist(
              selectedVideo,
              dispatchPlaylist,
              dispatchType,
              playlistType,
              currentTheme,
            )
          : removeFromPredefinedPlaylist(
              videoId,
              dispatchPlaylist,
              dispatchType,
              playlistType,
              currentTheme,
            );

      case LIKES:
        return !isDuplicateLiked
          ? addToPredefinedPlaylist(
              selectedVideo,
              dispatchPlaylist,
              dispatchType,
              playlistType,
              currentTheme,
            )
          : removeFromPredefinedPlaylist(
              videoId,
              dispatchPlaylist,
              dispatchType,
              playlistType,
              currentTheme,
            );
      default:
        return selectedVideo;
    }
  };

  // Add video to history

  const { title, channelName, channelLogo, views, alt } = selectedVideo;
  return (
    <main className={`${currentTheme}main`}>
      <section>
        {loading ? (
          <Loader type={currentTheme === "dark-" ? "dark" : "light"} />
        ) : (
          <>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="iframe"
              />
            </div>
            <div className="flex centered-container">
              <div className="flex flex-col">
                <div className="flex-col">
                  <p className="pt-2 video-title">{title}</p>
                  <p className="pt-2 video-views">{views} views</p>
                </div>
                <div className="flex pt-10">
                  <img
                    src={channelLogo}
                    alt={alt}
                    className="channelLogo mr-8"
                  />
                  <div className="flex-col">
                    <span className="pl-6 channelName">{channelName}</span>
                  </div>
                </div>
              </div>
              <div className="flex btn-container">
                <Tooltip
                  text={!isDuplicateLiked ? "Like video" : "Dislike video"}
                >
                  <button
                    type="button"
                    className={`${currentTheme}actions`}
                    onClick={
                      !isDuplicateLiked
                        ? () => handleAction(ADD_TO_LIKED, LIKES)
                        : () => handleAction(REMOVE_LIKED, LIKES)
                    }
                  >
                    {isDuplicateLiked ? (
                      <i className="fas fa-thumbs-up pr-6" />
                    ) : (
                      <i className="far fa-thumbs-up pr-2" />
                    )}
                  </button>
                </Tooltip>
                <Tooltip
                  text={
                    !isDuplicateWatchLater
                      ? "Watch Later"
                      : "Remove watch later"
                  }
                >
                  <button
                    type="button"
                    className={`${currentTheme}actions`}
                    onClick={() =>
                      !isDuplicateWatchLater
                        ? handleAction(ADD_TO_WATCH_LATER, WATCH_LATER)
                        : handleAction(REMOVE_WATCH_LATER, WATCH_LATER)
                    }
                  >
                    {isDuplicateWatchLater ? (
                      <i className="fas fa-clock" />
                    ) : (
                      <i className="far fa-clock pr-2" />
                    )}
                  </button>
                </Tooltip>

                <Tooltip text="Save to Watch later">
                  <button
                    type="button"
                    className={`${currentTheme}actions`}
                    onClick={() => handleAction(ADD_TO_PLAYLIST, PLAYLIST)}
                  >
                    <i className="fad fa-list-alt pr-6" />
                    Save
                  </button>
                </Tooltip>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
