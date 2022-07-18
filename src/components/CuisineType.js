import { useState } from "react"
import axios from 'axios';
import Recipe from "./Recipe";
import { v4 as uuidv4} from "uuid"

const CuisineType = ({ cuisineType }) => {
    const [query, setQuery] = useState("") 
    const [recipes, setRecipes] = useState([]);

    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}&cuisineType=${cuisineType}`

    const getRequest = () => {
      axios.get(url).then((response) => {
        const data = response.data.hits;
        setRecipes(data)
        console.log(data);
      })
    }

    return ( 
        <div>
            <h1>{cuisineType}</h1>
            <input type="text" placeholder='Search food...' onChange={(e) => setQuery(e.target.value)} />
            <button onClick={getRequest}>Search</button> 
            {recipes !== [] && recipes.map(recipe => <Recipe recipe={recipe} key={uuidv4()} /> )}
        </div>
     );
}
 
export default CuisineType;