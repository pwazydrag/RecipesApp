import { ChangeEvent, useState, useEffect } from "react";
import classes from "./RecipeDetails.module.css";
import jablecznik from "./jablecznik.jpg";
import Rating from "@mui/material/Rating";
import { calculateAverage } from "../../utils/calculateAverage";
import { Recipe, Comment } from "../../utils/types";

type RecipeDetailsProps = {
  recipe: Recipe;
  comments: Comment[];
};

const RecipeDetails = ({ recipe, comments }: RecipeDetailsProps) => {
  const [userStarRating, setUserStarRating] = useState<number | null>(null);

  const isLogged: boolean = true;

  const handleUserStarRating = (
    event: ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setUserStarRating(newValue);
  };

  useEffect(() => {
    userStarRating !== null && console.log("Oceniono na: ", userStarRating);
  }, [userStarRating]);

  return (
    <div className={classes.recipeDetails}>
      <div>
        <h2>{recipe.title}</h2>
        <div>
          <Rating
            name="half-rating-read"
            value={calculateAverage(recipe.rating)}
            precision={0.5}
            readOnly
          ></Rating>
        </div>
      </div>
      <div className={classes.recipeGeneralInfo}>
        <div>
          <p>Autor</p>
          <p>{recipe.authorId}</p>
        </div>
        <div>
          <p>Kategoria</p>
          <p>{recipe.category}</p>
        </div>
        <div>
          <p>Czas przygotowania</p>
          <p>{recipe.preparationTime}</p>
        </div>
      </div>
      <div>
        <img src={jablecznik} alt="jablecznik" />
      </div>
      <div className={classes.actions}>
        <div>
          <button>Ulubione</button>
        </div>
        <div>
          <button>Oceń</button>
        </div>
        <div>
          <button>Pobierz</button>
        </div>
      </div>
      <div className={classes.ingredients}>
        <p>Lista składników:</p>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className={classes.preparation}>
        <p>Przygotowanie:</p>
        <ol>
          {recipe.preparation.map((prepStep, index) => (
            <li key={index}>{prepStep}</li>
          ))}
        </ol>
      </div>
      {!isLogged && (
        <div className={classes.rateRecipe}>
          <h3>Zaloguj się aby ocenić przepis!</h3>
        </div>
      )}
      {isLogged && (
        <div className={classes.rateRecipe}>
          <h3>Oceń ten ten przepis!</h3>
          <Rating
            name="userRating"
            value={userStarRating}
            onChange={handleUserStarRating}
            precision={0.5}
          ></Rating>
        </div>
      )}
      <div className={classes.comments}>
        <p>Komentarze:</p>
        {comments.map((commentSingle) => (
          <div key={commentSingle._id} className={classes.commentSingle}>
            <p>
              {commentSingle.authorId}
              <span className={classes.commentDate}>, 17.03.2024</span>
            </p>
            <p>{commentSingle.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetails;
