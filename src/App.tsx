import Sidebar from "components/sidebar";
import { BrowserRouter as Router } from "react-router-dom";
import PageRoutes from "routes";
import "./App.css";
import "styles/container.scss";
import Navbar from "components/navbar";
import ThemeProvider from "contexts/theme/themeState";
import VideoProvider from "contexts/videos/videoState";

function App() {
  return (
    <div>
      <Router>
        <VideoProvider>
          <ThemeProvider>
            <Navbar />
            <div className="container">
              <Sidebar />
              <PageRoutes />
            </div>
          </ThemeProvider>
        </VideoProvider>
      </Router>
    </div>
  );
}

export default App;
