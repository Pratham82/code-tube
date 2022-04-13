import Sidebar from "components/sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import PageRoutes from "routes";
import "./App.css";
import "styles/container.scss";
import Navbar from "components/navbar";
import ThemeProvider from "contexts/theme/themeState";
import VideoProvider from "contexts/videos/videoState";
import { Toaster } from "react-hot-toast";
import PlaylistProvider from "contexts/playlist/playlistState";

function App() {
  return (
    <Router>
      <PlaylistProvider>
        <VideoProvider>
          <ThemeProvider>
            <Navbar />
            <Toaster position="bottom-left" />
            <div className="container">
              <Sidebar />
              <PageRoutes />
            </div>
          </ThemeProvider>
        </VideoProvider>
      </PlaylistProvider>
    </Router>
  );
}

export default App;
