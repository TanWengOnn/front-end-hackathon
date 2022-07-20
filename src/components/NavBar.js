import { Link } from "react-router-dom";
import "./NavBar.css";
import { FaUtensils } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="navbar">
      <h1 className="logo">
        <FaUtensils />
        Mealicious
      </h1>
      <div className="menu">
        {/* Create NavBar hyperlinks */}
        <Link to="/" className="links">
          Home
        </Link>
        <Link to="/indian" className="links">
          Indian
        </Link>
        <Link to="/chinese" className="links">
          Chinese
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
