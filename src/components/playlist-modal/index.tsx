import useTheme from "hooks/useTheme";
import { TOGGLE_MODAL } from "types/theme";
import { useState } from "react";
import "styles/playlist-modal.scss";
import {
  createPlayList,
  removePlaylist,
  updatePlaylist,
  deleteFromPlaylist,
} from "services/playlist";
import usePlayList from "hooks/usePlaylists";
import {
  ADD_NEW_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  REMOVE_PLAYLIST,
} from "types/playlists";
import useVideos from "hooks/useVideos";

const initialData = {
  playlistName: "",
  description: "",
};

export default function PlaylistModal() {
  const {
    theme: { currentTheme },
    dispatchTheme,
  } = useTheme();
  const { playlists, dispatchPlaylist, loading } = usePlayList();
  const [inputData, setInputData] = useState(initialData);
  const { selectedVideo } = useVideos();

  const isVideoPresentInPlaylist = (videos: any) => {
    const { _id: selectedVideoId } = selectedVideo;
    return videos.map(({ _id: id }: any) => id).includes(selectedVideoId);
  };

  const handleChange = (event: any) => {
    const {
      target: { value, name },
    } = event;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setInputData(initialData);
    createPlayList(inputData, dispatchPlaylist, ADD_NEW_PLAYLIST, currentTheme);
  };

  const addToPlaylist = (playlistId: any, videos: any) => {
    if (isVideoPresentInPlaylist(videos)) {
      deleteFromPlaylist(
        selectedVideo,
        playlistId,
        dispatchPlaylist,
        REMOVE_FROM_PLAYLIST,
        currentTheme,
      );
    } else {
      updatePlaylist(
        selectedVideo,
        playlistId,
        dispatchPlaylist,
        ADD_TO_PLAYLIST,
        currentTheme,
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex mt-4">
        <span className="pl-6 playlist-modal-header">Create Playlist</span>
        <button
          type="button"
          className={`${currentTheme}close-modal-btn mr-8`}
          onClick={() =>
            dispatchTheme({
              type: TOGGLE_MODAL,
            })
          }
        >
          <i className="fas fa-times" />
        </button>
      </div>
      <div className="flex-col p-6">
        {playlists &&
          playlists.map(({ _id, playlistName, videos }: any) => (
            <span key={_id} className="playlist-container">
              <input
                type="checkbox"
                className="mr-10 mt-8"
                onChange={() => addToPlaylist(_id, videos)}
                checked={isVideoPresentInPlaylist(videos)}
              />
              <span className="pt-2">{playlistName}</span>{" "}
              <button
                type="button"
                className={`${currentTheme}delete-playlist-btn`}
                disabled={loading}
                onClick={() =>
                  removePlaylist(
                    _id,
                    dispatchPlaylist,
                    REMOVE_PLAYLIST,
                    currentTheme,
                  )
                }
              >
                <i className="far fa-trash" />
              </button>
            </span>
          ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="playlistName"
          onChange={handleChange}
          value={inputData.playlistName}
          placeholder="Playlist name"
          className={`${currentTheme}playlist-input`}
          disabled={loading}
          required
        />
        <button type="submit" className={`${currentTheme}save-playlist-btn`}>
          Save
        </button>
      </form>
    </div>
  );
}
