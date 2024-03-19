import { ChangeEvent, useState, useEffect } from "react";
import classes from "./RecipeDetails.module.css";
import jablecznik from "./jablecznik.jpg";
import Rating from "@mui/material/Rating";
import useFetchRecipe from "../../hooks/useFetchRecipe";
import { calculateAverage } from "../../utils/calculateAverage";

const RecipeDetails = () => {
  const [userStarRating, setUserStarRating] = useState<number | null>(null);
  const { data, isError, isLoading } = useFetchRecipe({
    id: "65f78cf9cfd9792120517a34",
  });

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

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div>
        <p>Ten przepis nie istnieje...</p>
      </div>
    );

  return (
    <div className={classes.recipeDetails}>
      <div>
        <h2>{data?.title}</h2>
        <div>
          <Rating
            name="half-rating-read"
            value={calculateAverage(data?.rating)}
            precision={0.5}
            readOnly
          ></Rating>
        </div>
      </div>
      <div className={classes.recipeGeneralInfo}>
        <div>
          <p>Autor</p>
          <p>{data?.authorId}</p>
        </div>
        <div>
          <p>Kategoria</p>
          <p>{data?.category}</p>
        </div>
        <div>
          <p>Czas przygotowania</p>
          <p>{data?.preparationTime}</p>
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
          {/* TUTAJ DOBRZE BĘDZIE ZMIENIĆ KEY NA ingredient._id Z LISTY SKŁADNIKÓW */}
          {data?.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className={classes.preparation}>
        <p>Przygotowanie:</p>
        <ol>
          {data?.preparation.map((prepStep, index) => (
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
        <div className={classes.commentSingle}>
          <p>
            SuperUser3000
            <span className={classes.commentDate}>, 17.03.2024</span>
          </p>
          <p>Niesamowity przepis! Bardzo mi się podobał</p>
        </div>
        <div className={classes.commentSingle}>
          <p>
            SuperUser3000
            <span className={classes.commentDate}>, 17.03.2024</span>
          </p>
          <p>Niesamowity przepis! Bardzo mi się podobał</p>
        </div>
        <div className={classes.commentSingle}>
          <p>
            SuperUser3000
            <span className={classes.commentDate}>, 17.03.2024</span>
          </p>
          <p>Niesamowity przepis! Bardzo mi się podobał</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
