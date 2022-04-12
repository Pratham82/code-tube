import axios from "axios";
import { useReducer, useEffect } from "react";
import { SET_LOADING } from "types/videos";
import toast from "react-hot-toast";
import staticToken from "assets/data";
import { INIT_PLAYLIST } from "types/playlists";
import playlistReducer from "./PlaylistReducer";
import PlaylistContext from ".";

const initialData: any = {
  history: [],
  watchLater: [],
  likes: [],
  playlists: [],
};

export default function PlaylistProvider({ children }: any) {
  const [playlistData, dispatchPlaylist] = useReducer(
    playlistReducer,
    initialData,
  );

  useEffect(() => {
    (async () => {
      dispatchPlaylist({ type: SET_LOADING, payload: true });
      try {
        const {
          data: { playlists },
        } = await axios.get("/api/user/playlists", {
          headers: { authorization: staticToken },
        });
        dispatchPlaylist({ type: INIT_PLAYLIST, payload: playlists });
        dispatchPlaylist({ type: SET_LOADING, payload: false });
      } catch (e) {
        toast.error("Unable to fetch playlists");
      }
    })();
  }, []);

  const { history, watchLater, likes, loading } = playlistData;

  return (
    <PlaylistContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        history,
        loading,
        watchLater,
        likes,
        dispatchPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
