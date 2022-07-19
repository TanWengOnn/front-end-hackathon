// import { v4 as uuidv4} from "uuid"
// import { useEffect, useState } from "react";
import { db } from "../firebase-config"
import { collection, addDoc, doc, deleteDoc  } from "firebase/firestore"
import { Link } from "react-router-dom" 

const Recipe = ({ label, image, url, ingredients, favourite, id }) => {
    // const { label, image, url, ingredients } = recipe.recipe;
    const userCollectionRef = collection(db, "favourite")

    // Add favourite to firebase DB
    const createRecipe = async () => {
        await addDoc(userCollectionRef, {label: label, image: image, url: url, ingredients: ingredients, favourite: true});
    }

    const deleteRecipe = async (id) => {
        const recipeDoc = doc(db, "favourite", id);
        await deleteDoc(recipeDoc);
        window.location.reload();
    }

    //console.log("food: "+ingredients.map(ingredient => ingredient.foodId))
    return ( 
        <div>
            {/* shows all of the recipe details */}
            
            <h2> {label} </h2>
            <Link to="/recipe-details" 
                state={{label: label, image: image, url: url, 
                ingredients: ingredients, favourite: favourite,id: id }}>
                    <img src={image} alt={label} />
            </Link>
            <a href={url} target="_blank" rel="noopener noreferrer">
                URL
            </a>
            { !favourite && <button onClick={createRecipe}>Add to favourite</button>}
            { favourite && <button onClick={() => {deleteRecipe(id)}}>Remove from favourite</button>}
           
            {/* shows the ingredients */}
            {
                //--Ingredients can be seen by clicking the image--//
                //--Uncomment to show the ingredients--//
                // ingredients.map(ingredient => 
                //     <ul key={uuidv4()}>
                //         <li>{ingredient.text}</li>
                //         <li>Weight - {ingredient.weight}</li>
                //         {/* <li>ID - {ingredient.foodId}</li> */}
                //     </ul>
                // )
            }

            {/* <Link to="/recipe-detail"><button>More Detail</button></Link> */}
        </div>
     );
}
 
export default Recipe;