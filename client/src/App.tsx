import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
<<<<<<< HEAD
import WatchlistPage from "./components/Watchlist";
import MovieReviewPage from "./components/MovieReviewPage"; 
=======
import WatchlistPage from "./components/Watchlist"; 
import MovieReviewPage from "./components/moviereviewpage";
>>>>>>> f518b33a3f1526da643adaf342f8e155dfdec0e7
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
<<<<<<< HEAD
          <Route path="/movie/:id" element={<MovieReviewPage />} />
=======
          <Route path="/moviereviewpage" element={<MovieReviewPage />} />
>>>>>>> f518b33a3f1526da643adaf342f8e155dfdec0e7
        </Routes>
      </div>
    </Router>
  );
};

export default App;
