import axios from "axios";
import { useReducer, useEffect } from "react";
import { SET_VIDEOS, SET_CATEGORIES, SET_LOADING } from "types/videos";
import { getFilteredVideos } from "utils";
import toast from "react-hot-toast";
import VideoContext from ".";
import videoReducer from "./videoReducer";

const initialData: any = {
  categories: [],
  videos: [],
  selectedVideo: {},
  selectedCategories: [],
  loading: false,
};

export default function VideoProvider({ children }: any) {
  const [videosData, dispatchVideos] = useReducer(videoReducer, initialData);

  useEffect(() => {
    (async () => {
      dispatchVideos({ type: SET_LOADING, payload: true });
      try {
        const {
          data: { categories },
        } = await axios.get("/api/categories");
        dispatchVideos({ type: SET_CATEGORIES, payload: categories });
        const {
          data: { videos },
        } = await axios.get("/api/videos");
        dispatchVideos({ type: SET_VIDEOS, payload: videos });
        dispatchVideos({ type: SET_LOADING, payload: false });
      } catch (e) {
        dispatchVideos({ type: SET_LOADING, payload: false });
        toast.error("Unable to fetch Videos");
      }
    })();
  }, []);

  const { videos, selectedVideo, selectedCategories, categories, loading } =
    videosData;
  const filteredVideos = getFilteredVideos(videos, selectedCategories);

  return (
    <VideoContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        categories,
        selectedCategories,
        filteredVideos,
        loading,
        dispatchVideos,
        selectedVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}
