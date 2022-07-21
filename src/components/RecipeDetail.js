import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase-config";
import "./RecipeDetail.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { FaWindowClose } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userCollectionRef = collection(db, "favourite");
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  // Get all of the labels within the database
  const getRecipes = async () => {
    // error handling
    try {
      const data = await getDocs(userCollectionRef);
      const dbLabels = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setFavouriteRecipes(dbLabels.map(recipe => recipe.label));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  // Add favourite to firebase DB
  const createRecipe = async () => {
    getRecipes();
    // Compares the label with the database's labels
    // checks if the label already exist in the database
    if (!favouriteRecipes.includes(location.state.label)) {
      try{
        await addDoc(userCollectionRef, {
          label: location.state.label,
          image: location.state.image,
          url: location.state.url,
          ingredients: location.state.ingredients,
          favourite: true,
        });
      }catch (error){
        console.error(error);
      }finally{
        toast("Saved to Favourites!");
      }
    } else {
      toast("Already exist in Favourites!");
    }
   
  };

  // Delete/Remove "favourite" and go back to the previous page
  const deleteRecipe = async (id) => {
    try {
      const recipeDoc = doc(db, "favourite", id);
      await deleteDoc(recipeDoc);
      // Go back to the previous page
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  // previous page button
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="food_container">
      <div className="layout">
        <div className="item1">
          <h2> {location.state.label} </h2>
        </div>
        <div className="item2">
          <img
            className="image_item2"
            src={location.state.image}
            alt={location.state.label}
          />
        </div>
        <div className="item3">
          <button className="button" onClick={handleBack}>
            <FaWindowClose /> Close
          </button>
          {!location.state.favourite && (
            <button className="button" onClick={createRecipe}>
              <FaHeart /> Add to favourite
            </button>
          )}
          {location.state.favourite && (
            <button
              className="button"
              onClick={() => {
                deleteRecipe(location.state.id);
              }}
            >
              <FaHeartBroken /> Remove from favourite
            </button>
          )}
          <a
            href={location.state.url}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            <FaEllipsisH /> Reference
          </a>
          <div className="ingredients">
            {/* shows the ingredients */}
            <h4>Ingredients:</h4>
            {location.state.ingredients.map((ingredient) => (
              <ul key={uuidv4()}>
                <li>{ingredient.text}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecipeDetail;
