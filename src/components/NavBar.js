import { Link } from "react-router-dom";
import "./NavBar.css";
import { FaUtensils } from "react-icons/fa";

const NavBar = () => {
  // const linkStyle = {
  //   margin: "1rem",
  //   textDecoration: "none",
  //   color: "green",

  // };

  return (
    <div className="navbar">
      {/* <div className="wrapper"> */}
      <h1 className="logo">
        <FaUtensils />
        Mealicious
      </h1>
      <div className="menu">
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
      {/* </div> */}
    </div>
  );
};

export default NavBar;
