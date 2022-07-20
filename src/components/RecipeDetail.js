/*** IGNORE THIS PAGE ***/
import { useLocation, useNavigate  } from "react-router-dom";
import { v4 as uuidv4} from "uuid"
import { db } from "../firebase-config"
import { collection, addDoc, doc, deleteDoc  } from "firebase/firestore"

const RecipeDetail = () => {
    const location = useLocation();
    const navigate = useNavigate ();

    const userCollectionRef = collection(db, "favourite")

    // Add favourite to firebase DB
    const createRecipe = async () => {
        await addDoc(userCollectionRef, {label: location.state.label, image: location.state.image, url: location.state.url, 
            ingredients: location.state.ingredients, favourite: true});
    }

    // Delete/Remove "favourite" and go back to the previous page 
    const deleteRecipe = async (id) => {
        const recipeDoc = doc(db, "favourite", id);
        await deleteDoc(recipeDoc);
        // Go back to the previous page
        navigate(-1);
    }

    // previous page button 
    const handleBack = () => {
        navigate(-1);
    }
    //console.log(location.state)
    return ( 
        <div>
            <button onClick={handleBack}>X</button>
            <h2>Recipe Detail</h2>
            <h2> {location.state.label} </h2>
            <img src={location.state.image} alt={location.state.label} />
            <a href={location.state.url} target="_blank" rel="noopener noreferrer">
                URL
            </a>
            { !location.state.favourite && <button onClick={createRecipe}>Add to favourite</button>}
            { location.state.favourite && <button onClick={() => {deleteRecipe(location.state.id)}}>Remove from favourite</button>}
           
            {/* shows the ingredients */}
            {
                location.state.ingredients.map(ingredient => 
                    <ul key={uuidv4()}>
                        <li>{ingredient.text}</li>
                        <li>Weight - {ingredient.weight}</li>
                        {/* <li>ID - {ingredient.foodId}</li> */}
                    </ul>
                )
            }
        </div>
     );
}
 
export default RecipeDetail;