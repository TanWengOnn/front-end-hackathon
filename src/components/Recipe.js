import { v4 as uuidv4} from "uuid"
import { Link } from "react-router-dom" 

const Recipe = ({ recipe }) => {
    const { label, image, url, ingredients } = recipe.recipe;

    return ( 
        <div>
            {/* shows all of the recipe details */}
            <h2> {label} </h2>
            <img src={image} alt={label} />
            <a href={url} target="_blank" rel="noopener noreferrer">
                URL
            </a>
            {/* shows the ingredients */}
            {
                ingredients.map(ingredient => 
                    <ul key={uuidv4()}>
                        <li>{ingredient.text}</li>
                        <li>Weight - {ingredient.weight}</li>
                    </ul>
                )
            }

            {/* <Link to="/recipe-detail"><button>More Detail</button></Link> */}
        </div>
     );
}
 
export default Recipe;