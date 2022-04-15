import ActionModal from "components/action-modal";
import Tooltip from "components/tooltip";
import usePlayList from "hooks/usePlaylists";
import useTheme from "hooks/useTheme";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  addToPredefinedPlaylist,
  removeFromPredefinedPlaylist,
} from "services/common";
import "styles/videoCard.scss";
import "styles/video-page.scss";
import {
  HISTORY,
  LIKES,
  REMOVED_FROM_HISTORY,
  REMOVE_FROM_PLAYLIST,
  WATCH_LATER,
} from "types/playlists";
import { isDuplicate } from "utils/index";
import { deleteFromPlaylist } from "services/playlist";

function LinkWrapper({ children, videoId }: any) {
  return <Link to={`/video/${videoId}`}>{children}</Link>;
}
export default function VideoCardExpanded({ cardData, playlistId }: any) {
  const {
    theme: { currentTheme },
  } = useTheme();
  const { watchLater, likes, dispatchPlaylist } = usePlayList();
  const { _id: videoId } = cardData;
  const { title, channelName, views, thumbnail, channelLogo, duration, alt } =
    cardData;

  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<any>(null);
  const onClickOutside = useCallback(() => setIsOpen(false), []);

  // common duplication check
  const isDuplicateWatchLater = isDuplicate(videoId, watchLater);
  const isDuplicateLiked = isDuplicate(videoId, likes);

  // clicked outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        if (onClickOutside) {
          onClickOutside();
        }
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  const handleAction = (dispatchType: string, playlistType: string) => {
    switch (playlistType) {
      case WATCH_LATER:
        setIsOpen(false);
        return !isDuplicateWatchLater
          ? addToPredefinedPlaylist(
              cardData,
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
        setIsOpen(false);
        return !isDuplicateLiked
          ? addToPredefinedPlaylist(
              cardData,
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
      case HISTORY:
        return removeFromPredefinedPlaylist(
          videoId,
          dispatchPlaylist,
          dispatchType,
          playlistType,
          currentTheme,
        );
      default:
        setIsOpen(false);
    }
    //  Close modal
    return setIsOpen(false);
  };

  const handleDelete = () => {
    if (pathname.includes("history")) {
      handleAction(REMOVED_FROM_HISTORY, HISTORY);
    } else {
      deleteFromPlaylist(
        cardData,
        playlistId,
        dispatchPlaylist,
        REMOVE_FROM_PLAYLIST,
        currentTheme,
      );
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className={`${currentTheme}video-card-expanded`}>
        <LinkWrapper videoId={videoId}>
          <div className="flex">
            <img src={thumbnail} alt={alt} className="thumbnail" />
            <div className="duration-card p-2">
              {(duration / 60).toFixed(2)}
            </div>
          </div>
        </LinkWrapper>
      </div>
      <div className="flex pt-6 pb-10 pl-8 pr-4 video-info flex-wrap">
        <Tooltip text={channelName}>
          <img src={channelLogo} alt={alt} className="channelLogo mr-8" />
        </Tooltip>
        <Tooltip text={title} delay={500}>
          <p className="history-title">{title}</p>
          <span>
            <span className="channelName pr-10">{channelName}</span>
            <span className="video-views">{views} views</span>
          </span>
        </Tooltip>
      </div>
      <div className="history-options">
        <button
          type="button"
          className={`${currentTheme}options`}
          onClick={() => handleDelete()}
        >
          <i className="fas fa-times" />
        </button>
        <button
          type="button"
          className={`${currentTheme}options`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fas fa-ellipsis-v" />
        </button>
      </div>

      <ActionModal
        isOpen={isOpen}
        currentTheme={currentTheme}
        modalRef={modalRef}
        handleAction={handleAction}
        videoId={videoId}
        isDuplicates={{ isDuplicateWatchLater, isDuplicateLiked }}
        modalType="expanded"
      />
    </div>
  );
}
