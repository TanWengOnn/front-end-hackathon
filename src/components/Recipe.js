import { v4 as uuidv4 } from "uuid";
import "./Recipe.css";

const Recipe = ({ title, calories, image, ingredients }) => {
  //   const { label, image, url, ingredients } = recipe.recipe;

  return (
    <div className="recipe">
      <h1>{title}</h1>
      <ol>
        {/* shows the ingredients */}
        {/* {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))} */}
      </ol>

      {/* <p>Calories : {calories}</p> */}

      <img className="image" src={image} alt="" />
      {/* <Link to="/recipe-detail"><button>More Detail</button></Link> */}
    </div>
  );
};

export default Recipe;
