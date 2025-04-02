import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: "1rem", background: "#282c34", color: "white" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        </li>
        <li>
          <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Profile</Link>
        </li>
        <li>
          <Link to="/signin" style={{ color: "white", textDecoration: "none" }}>Sign In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
