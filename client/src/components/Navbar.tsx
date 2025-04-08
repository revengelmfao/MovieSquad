import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="min-w-screen w-full bg-gray-800 text-white p-4 items-center">
      <ul className="flex gap-6 list-none">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/signin" className="hover:underline">
            Sign In
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
