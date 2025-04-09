import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import WatchlistPage from "./components/Watchlist";
import MovieReviewPage from "./components/MovieReviewPage"; 
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/watchlist/:watchlistName" element={<WatchlistPage />} />
          <Route path="/movie/:id" element={<MovieReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
