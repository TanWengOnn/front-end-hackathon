import { useEffect, useState } from "react"
import axios from 'axios';
import Recipe from "./Recipe";
import { v4 as uuidv4} from "uuid"
import Alert from './Alert';

const CuisineType = ({ cuisineType }) => {
    const [search, setSearch] = useState("") 
    const [query, setQuery] = useState("chicken") 
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState("");
    const [isPending, setIsPending] = useState(true);

    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}&cuisineType=${cuisineType}`

    // Get Request 
    useEffect(() => {
      setIsPending(true);
      console.log("test2");
      axios.get(url)
      .then((response) => {
        // Show Alert if search item does not exist
        if (response.data.count === 0)
        {
          setAlert("Searched food does not exist")
        }
        else{
          setRecipes(response.data.hits)
          setSearch("")
          setAlert("")
        }
        setIsPending(false)
        //console.log(data);
      })
      .catch((error) => {
        console.log(`${error.response.status} (${error.message})`)
        setIsPending(false)
      })
    }, [query, url, cuisineType]) // "cuisineType" in "useEffect" allows the page to refresh when changing between the cuisine type

    const handleSubmit = (e) => {
      e.preventDefault()
      // console.log(query)
      // Only execute the search if
      // there are user input
      if(search){
        setQuery(search)
      }
    }

    return ( 
        <div>
            <h1>{cuisineType}</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder='Search food...' value={search} onChange={(e) => setSearch(e.target.value)} />
              <button>Search</button> 
            </form>

            {/* Render alert if there is an alert */}
            {alert !== "" && <Alert alert={alert}/>}
            {/* Show loading message */}
            { isPending && <div>Loading...</div> }
            {/* Render the recipes */}
            {recipes !== [] && recipes.map(recipe => <Recipe recipe={recipe} key={uuidv4()} /> )}
            
        </div>
     );
}
 
export default CuisineType;