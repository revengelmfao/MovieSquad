import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/auth.tsx";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import WatchlistPage from "./components/Watchlist"; 
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/watchlist/:watchlistName" element={<WatchlistPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;