import axios from 'axios';
import { useEffect, useState } from 'react';
import { v4 as uuidv4} from "uuid"
import Alert from './Alert';
import Recipe from './Recipe';

const Home = ({ cuisineType }) => {
    const [search, setSearch] = useState("") 
    const [query, setQuery] = useState("chicken") 
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState("");
    const [isPending, setIsPending] = useState(true);

    let url;


    if (cuisineType === "Home")
    {
      url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`
    }
    else{
      url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}&cuisineType=${cuisineType}`
    }
    

    // Get Request 
    useEffect(() => {
      setIsPending(true);
      // console.log("test");
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
        // console.log(recipes.map(recipe =>  recipe.recipe.label));
      })
      .catch((error) => {
        console.log(`${error.response.status} (${error.message})`)
        setIsPending(false)
      })
    }, [query, url, cuisineType])

    const handleSubmit = (e) => {
      e.preventDefault();
      // Only execute the search if
      // there are user input
      if(search){
        setQuery(search)
      }
    }
    
    return ( 
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Search food...' value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type='submit'>Search</button> 
          </form>

          {/* Render alert if there is an alert */}
          {alert !== "" && <Alert alert={alert}/>}
          {/* Show loading message */}
          { isPending && <div>Loading...</div> }
          {/* Render the recipes */}
          {recipes !== [] && recipes.map(recipe => <Recipe 
          label={recipe.recipe.label} 
          image={recipe.recipe.image} 
          url={recipe.recipe.url} 
          ingredients={recipe.recipe.ingredients}
          favourite={false} 
          key={uuidv4()} /> )}
        </div>
     );
}
 
export default Home;