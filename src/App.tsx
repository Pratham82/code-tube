import { BrowserRouter as Router } from "react-router-dom";
import PageRoutes from "routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <PageRoutes />
      </Router>
    </div>
  );
}

export default App;
