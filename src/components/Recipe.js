// import { v4 as uuidv4} from "uuid"
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { ReactComponent as GreyHeart } from "../images/grey-heart.svg"; // Imported svg from file as a component
import { ReactComponent as RedHeart } from "../images/red-heart.svg"; // Imported svg from file as a component
import "./Recipe.css";

const Recipe = ({ label, image, url, ingredients, favourite, id }) => {
  // const { label, image, url, ingredients } = recipe.recipe;
  const userCollectionRef = collection(db, "favourite");
  const [favouriteRecipes, setFavouriteRecipes] = useState([])

  const getRecipes = async () => {
    const data = await getDocs(userCollectionRef);
    const dbLabels =  data.docs.map(doc => ({...doc.data(), id: doc.id}))
    setFavouriteRecipes(dbLabels.map(recipe => recipe.label))
  }

  useEffect(()=>{
    getRecipes();
  }, [])
  

  // Add favourite to firebase DB
  const createRecipe = async () => {
    getRecipes();

    // checks if the label already exist in the database 
    if (!favouriteRecipes.includes(label)){
      await addDoc(userCollectionRef, {
        label: label,
        image: image,
        url: url,
        ingredients: ingredients,
        favourite: true,
      });
      
    }
    // else{
    //   console.log("entry exist")
    //   console.log(favouriteRecipes)
    // }
    
  };

  const deleteRecipe = async (id) => {
    const recipeDoc = doc(db, "favourite", id);
    await deleteDoc(recipeDoc);
    window.location.reload();
  };

  //console.log("food: "+ingredients.map(ingredient => ingredient.foodId))
  return (
    <div className="main-container">
      {/* shows all of the recipe details */}

      <h2> {label} </h2>
      <div className="image-container">
        <Link
          className="image"
          to="/recipe-details"
          state={{
            label: label,
            image: image,
            url: url,
            ingredients: ingredients,
            favourite: favourite,
            id: id,
          }}
        >
          <img src={image} alt={label} />
        </Link>
        <div className="icon-container">
          {!favourite && (
            <>
              {" "}
              {/* Replaced favourite button with icon */}
              <RedHeart className="icon" onClick={createRecipe} />
            </>
          )}
          {favourite && (
            <>
              <GreyHeart
                className="icon"
                onClick={() => {
                  deleteRecipe(id);
                }}
              />
            </>
          )}
        </div>
      </div>
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
};

export default Recipe;
