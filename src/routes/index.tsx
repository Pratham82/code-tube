import { Routes, Route } from "react-router-dom";
import {
  History,
  Home,
  Liked,
  PageNotFound,
  Playlists,
  Videos,
  WatchLater,
} from "pages";
import VideoPage from "components/video-page/indext";

export default function PageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/video/:videoId" element={<VideoPage />} />
      <Route path="/watchLater" element={<WatchLater />} />
      <Route path="/liked" element={<Liked />} />
      <Route path="/history" element={<History />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
