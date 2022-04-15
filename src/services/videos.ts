import axios from "axios";
import toast from "react-hot-toast";
import { SET_LOADING } from "types/videos";

const GET_VIDEO = "/api/video/";

/**
 *
 * @param videoId video id
 * @param dispatch function for playlist context
 * @param dispatchType type of dispatch
 * @param actionType type of action
 * @param theme current theme
 */
export const setSelectedVideo = async (
  videoId: any,
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
      data: { video },
    } = await axios.get(`${GET_VIDEO}${videoId}`);
    dispatch({
      type: dispatchType,
      payload: video,
    });

    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    if (theme) {
      toast.success("Video loaded successfully", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.success("Video loaded successfully");
    }
  } catch (e) {
    toast.error("Unable to fetch video..");
  }
};

export const setClickedVideo = async (
  videoId: any,
  dispatch: any,
  dispatchType: any,
) => {
  try {
    const {
      data: { video },
    } = await axios.get(`${GET_VIDEO}${videoId}`);
    dispatch({
      type: dispatchType,
      payload: video,
    });
  } catch (e) {
    toast.error("Unable to fetch video..");
  }
};
