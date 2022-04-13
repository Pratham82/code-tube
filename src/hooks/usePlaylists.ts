import PlaylistContext from "contexts/playlist";
import { useContext } from "react";

const usePlayList = () => useContext(PlaylistContext);

export default usePlayList;
