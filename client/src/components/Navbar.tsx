import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth.tsx';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Movie Squad
        </Link>
        
        <div className="space-x-4">
          <Link to="/" className="hover:text-orange-500">
            Home
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="hover:text-orange-500">
                Profile
              </Link>
              <button 
                onClick={logout} 
                className="hover:text-orange-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/signin" className="hover:text-orange-500">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;