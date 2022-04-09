import VideoContext from "contexts/videos";
import { useContext } from "react";

const useVideos = () => useContext(VideoContext);
export default useVideos;
