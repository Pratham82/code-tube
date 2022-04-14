import ActionModal from "components/action-modal";
import LinkWrapper from "components/link-wrapper";
import Tooltip from "components/tooltip";
// import VideoPlayer from "components/video-player";
import usePlayList from "hooks/usePlaylists";
import useTheme from "hooks/useTheme";
import useVideos from "hooks/useVideos";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  addToPredefinedPlaylist,
  removeFromPredefinedPlaylist,
} from "services/common";
import { setClickedVideo } from "services/videos";
import "styles/videoCard.scss";
import { LIKES, WATCH_LATER } from "types/playlists";
import { SET_SELECTED_VIDEO } from "types/videos";
import { isDuplicate } from "utils/index";

export default function VideoCard({ cardData }: any) {
  const {
    theme: { currentTheme },
  } = useTheme();
  const { watchLater, likes, dispatchPlaylist } = usePlayList();
  const { dispatchVideos } = useVideos();
  const { _id: videoId } = cardData;
  const { title, channelName, thumbnail, channelLogo, duration, alt } =
    cardData;
  const [isOpen, setIsOpen] = useState(false);
  const [body, setBody] = useState(false);
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

  const onOptionsClick = () => {
    setIsOpen(!isOpen);
    setClickedVideo(videoId, dispatchVideos, SET_SELECTED_VIDEO);
  };

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
      default:
        setIsOpen(false);
    }

    //  Close modal
    return setIsOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div
        className={`${currentTheme}video-card`}
        onMouseEnter={() => {
          setBody(true);
          setIsOpen(false);
        }}
        onMouseLeave={() => setBody(false)}
      >
        <LinkWrapper videoId={videoId}>
          <div className="flex">
            {body && (
              <LinkWrapper videoId={videoId}>
                {/* <VideoPlayer isPlaying={body} videoId={videoId} /> */}
                <img src={thumbnail} alt={alt} className="thumbnail" />
                <div className="duration-card p-2">
                  {(duration / 60).toFixed(2)}
                </div>
              </LinkWrapper>
            )}
            {!body && (
              <>
                <img src={thumbnail} alt={alt} className="thumbnail" />
                <div className="duration-card p-2">
                  {(duration / 60).toFixed(2)}
                </div>
              </>
            )}
          </div>
        </LinkWrapper>
        <div style={{ display: body ? "block" : "none" }}>
          <div className="flex pt-12 pb-10 pl-4 pr-4">
            <img src={channelLogo} alt={alt} className="channelLogo mr-8" />
            <p className="title">{title}</p>
            <LinkWrapper videoId={videoId} currentTheme={currentTheme}>
              <i className=" pl-10 far fa-external-link" />
              <br />
              OPEN
            </LinkWrapper>
          </div>
        </div>
      </div>

      {!body && (
        <div className="flex pt-6 pb-10 pl-8 pr-4">
          <Tooltip text={channelName}>
            <img src={channelLogo} alt={alt} className="channelLogo mr-8" />
          </Tooltip>
          <Tooltip text={title} delay={500}>
            <p className="title">{title}</p>
          </Tooltip>
          <button
            type="button"
            className={`${currentTheme}options`}
            onClick={onOptionsClick}
          >
            <i className="fas fa-ellipsis-v" />
          </button>
        </div>
      )}
      <ActionModal
        isOpen={isOpen}
        currentTheme={currentTheme}
        modalRef={modalRef}
        handleAction={handleAction}
        videoId={videoId}
        isDuplicates={{ isDuplicateWatchLater, isDuplicateLiked }}
        modalType="normal"
      />
    </div>
  );
}
