import { Link } from "react-router-dom" 

const NavBar = () => {
    return ( 
        <nav className="navbar">
            <h1>Melicious</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/favourite">Favourite</Link>
                <Link to="/indian">Indian</Link>
                <Link to="/chinese">Chinese</Link>
            </div>
        </nav>
     );
}
 
export default NavBar;