import {
  ADD_TO_LIKED,
  ADD_TO_PLAYLIST,
  ADD_TO_WATCH_LATER,
  LIKES,
  PLAYLIST,
  REMOVE_LIKED,
  REMOVE_WATCH_LATER,
  WATCH_LATER,
} from "types/playlists";

export default function ActionModal({
  isOpen,
  currentTheme,
  modalRef,
  handleAction,
  isDuplicates,
  modalType,
}: any) {
  const { isDuplicateWatchLater, isDuplicateLiked } = isDuplicates;

  return (
    <div
      className={
        isOpen
          ? `${currentTheme}${
              modalType === "normal"
                ? "video-card-modal"
                : "video-card-modal-expanded"
            }`
          : "hidden"
      }
      ref={modalRef}
    >
      <button
        type="button"
        className={`${currentTheme}modal-actions`}
        onClick={() =>
          !isDuplicateWatchLater
            ? handleAction(ADD_TO_WATCH_LATER, WATCH_LATER)
            : handleAction(REMOVE_WATCH_LATER, WATCH_LATER)
        }
      >
        {isDuplicateWatchLater ? (
          <>
            <i className="fas fa-clock pr-2" /> Remove Watch Later
          </>
        ) : (
          <>
            <i className="far fa-clock pr-2" /> Watch Later
          </>
        )}
      </button>

      <button
        type="button"
        className={`${currentTheme}modal-actions`}
        onClick={
          !isDuplicateLiked
            ? () => handleAction(ADD_TO_LIKED, LIKES)
            : () => handleAction(REMOVE_LIKED, LIKES)
        }
      >
        {isDuplicateLiked ? (
          <>
            <i className="fas fa-thumbs-up pr-6" />
            Remove Liked
          </>
        ) : (
          <>
            <i className="far fa-thumbs-up pr-2" />
            Like Video
          </>
        )}
      </button>
      <button
        type="button"
        className={`${currentTheme}modal-actions`}
        onClick={() => handleAction(ADD_TO_PLAYLIST, PLAYLIST)}
      >
        <i className="fad fa-list-alt pr-6" />
        Save to playlist
      </button>
    </div>
  );
}
