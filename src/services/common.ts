import staticToken from "assets/data";
import axios from "axios";
import toast from "react-hot-toast";
// import { ADD_TO_WATCH_LATER } from "types/playlists";

interface IUrls {
  [key: string]: string;
}

const dict: IUrls = {
  WATCH_LATER: "/api/user/watchlater",
  LIKES: "/api/user/likes",
  HISTORY: "/api/user/history",
};

/**
 *
 * @param video video object
 * @param dispatch function for playlist context
 * @param dispatchType type of dispatch
 * @param actionType type of action
 * @param theme current theme
 */
export const addToPredefinedPlaylist = async (
  video: any,
  dispatch: any,
  dispatchType: any,
  actionType: any,
  theme: any,
) => {
  try {
    const {
      data: { watchlater, likes, history },
    } = await axios.post(
      `${dict[actionType]}`,
      { video },
      {
        headers: {
          authorization: staticToken,
        },
      },
    );
    dispatch({
      type: dispatchType,
      payload: watchlater || likes || history,
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

/**
 *
 * @param videoId video id
 * @param dispatch function for playlist context
 * @param dispatchType type of dispatch
 * @param actionType type of action
 * @param theme current theme
 */
export const removeFromPredefinedPlaylist = async (
  videoId: any,
  dispatch: any,
  dispatchType: any,
  actionType: any,
  theme: any,
) => {
  try {
    const {
      data: { watchlater, likes, history },
    } = await axios.delete(`${dict[actionType]}/${videoId}`, {
      headers: {
        authorization: staticToken,
      },
    });
    dispatch({
      type: dispatchType,
      payload: watchlater || likes || history,
    });
    if (theme) {
      toast.success(dispatchType, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.success(dispatchType, { icon: "🗑" });
    }
  } catch (e) {
    toast.error("Something went wrong...");
  }
};
