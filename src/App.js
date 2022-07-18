import './App.css';
import Home from "./components/Home"
import NavBar from './components/NavBar';
import CuisineType from './components/CuisineType';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import RecipeDetail from './components/RecipeDetail';

function App() {

  return (
    <Router >
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          {/* Copy paste the line below for more cuisine type */}
          <Route exact path="/indian" element={<CuisineType cuisineType={"Indian"}/>}/>
          <Route exact path="/chinese" element={ <CuisineType cuisineType={"Chinese"}/>}/>
          {/* <Route exact path="/recipe-detail" element={ <RecipeDetail /> }/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
