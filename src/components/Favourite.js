import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Recipe from "./Recipe";
import { v4 as uuidv4 } from "uuid";
import "./Favourite.css";

const Favourite = () => {
  // Getting Database "table"
  const userCollectionRef = collection(db, "favourite");
  // State to hold the database information
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  // Getting Database information on startup/refresh
  useEffect(() => {
    const getRecipes = async () => {
      // Error Handling
      try {
        const data = await getDocs(userCollectionRef);
        setFavouriteRecipes(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    getRecipes();
  }, []);

  return (
    <div className="favourite_container">
      <h1>Favourite</h1>
      {favouriteRecipes.length === 0 && <h2>No Favourites</h2>}
      <div className="favourite">
        {/* Recipe "Card" in the Favourite page */}
        {favouriteRecipes.map((recipe) => (
          <Recipe
            key={uuidv4()}
            label={recipe.label}
            image={recipe.image}
            url={recipe.url}
            ingredients={recipe.ingredients}
            id={recipe.id}
            favourite={recipe.favourite}
          />
        ))}
      </div>
    </div>
  );
};

export default Favourite;
