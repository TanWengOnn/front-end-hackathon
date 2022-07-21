import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeDetail from "./components/RecipeDetail";
import Favourite from "./components/Favourite";

function App() {
  return (
    // Setting the main routes for the application
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home cuisineType={"Home"} />} />
          <Route exact path="/favourite" element={<Favourite />} />
          {/* Copy paste the line below for more cuisine type */}
          <Route
            exact
            path="/south_east_asian"
            element={<Home cuisineType={"South East Asian"} />}
          />
          <Route
            exact
            path="/middle_eastern"
            element={<Home cuisineType={"Middle Eastern"} />}
          />
          <Route
            exact
            path="/indian"
            element={<Home cuisineType={"Indian"} />}
          />
          <Route
            exact
            path="/american"
            element={<Home cuisineType={"American"} />}
          />
          <Route
            exact
            path="/chinese"
            element={<Home cuisineType={"Chinese"} />}
          />
          <Route
            exact
            path="/italian"
            element={<Home cuisineType={"Italian"} />}
          />
          <Route exact path="/recipe-details" element={<RecipeDetail />} />
          {/* <Route exact path="/recipe-detail" element={ <RecipeDetail /> }/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
