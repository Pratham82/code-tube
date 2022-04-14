import staticToken from "assets/data";
import axios from "axios";
import toast from "react-hot-toast";
import { SET_LOADING } from "types/videos";

const PLAYLIST_URL = "/api/user/playlists";

export const createPlayList = async (
  playlist: any,
  dispatch: any,
  dispatchType: any,
  theme: any,
) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const {
      data: { playlists },
    } = await axios.post(
      `${PLAYLIST_URL}`,
      { playlist },
      {
        headers: {
          authorization: staticToken,
        },
      },
    );
    dispatch({
      type: dispatchType,
      payload: playlists,
    });

    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    if (theme) {
      toast.success(dispatchType, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.success(dispatchType);
    }
  } catch (e) {
    toast.error("Something went wrong...");
  }
};

export const removePlaylist = async (
  playlistId: any,
  dispatch: any,
  dispatchType: any,
  theme: any,
) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const {
      data: { playlists },
    } = await axios.delete(`${PLAYLIST_URL}/${playlistId}`, {
      headers: {
        authorization: staticToken,
      },
    });
    dispatch({
      type: dispatchType,
      payload: playlists,
    });
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    if (theme) {
      toast.success(dispatchType, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.success(dispatchType);
    }
  } catch (e) {
    toast.error("Something went wrong...");
  }
};

export const updatePlaylist = async (
  video: any,
  playlistId: any,
  dispatch: any,
  dispatchType: any,
  theme: any,
) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const {
      data: { playlist },
    } = await axios.post(
      `${PLAYLIST_URL}/${playlistId}`,
      { video },
      {
        headers: {
          authorization: staticToken,
        },
      },
    );
    dispatch({
      type: dispatchType,
      payload: playlist,
    });

    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    if (theme) {
      toast.success(dispatchType, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.success(dispatchType);
    }
  } catch (e) {
    toast.error("Something went wrong...");
  }
};

export const deleteFromPlaylist = async (
  video: any,
  playlistId: any,
  dispatch: any,
  dispatchType: any,
  theme: any,
) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const { _id: id } = video;
    const {
      data: { playlist },
    } = await axios.delete(`${PLAYLIST_URL}/${playlistId}/${id}`, {
      headers: {
        authorization: staticToken,
      },
    });
    dispatch({
      type: dispatchType,
      payload: playlist,
    });

    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    if (theme) {
      toast.success(dispatchType, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.success(dispatchType);
    }
  } catch (e) {
    toast.error("Something went wrong...");
  }
};
