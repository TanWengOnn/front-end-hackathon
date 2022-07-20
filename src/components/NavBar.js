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
        {/* Display recipe based on cuisine type */}
        <Link to="/south_east_asian" className="links">
          South East Asian
        </Link>
        <Link to="/middle_eastern" className="links">
          Middle Eastern
        </Link>
        <Link to="/indian" className="links">
          Indian
        </Link>
        <Link to="/american" className="links">
          American
        </Link>
        <Link to="/chinese" className="links">
          Chinese
        </Link>
        <Link to="/italian" className="links">
          Italian
        </Link>
        <Link to="/Favourite" className="links">
          Fav
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
