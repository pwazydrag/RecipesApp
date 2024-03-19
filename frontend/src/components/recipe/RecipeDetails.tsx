import { ChangeEvent, useState, useEffect } from "react";
import classes from "./RecipeDetails.module.css";
import jablecznik from "./jablecznik.jpg";
import Rating from "@mui/material/Rating";
import useFetchData from "../../hooks/useFetchRecipe";

const RecipeDetails = () => {
  const starValue: number = 4.3;
  const isLogged: boolean = true;

  const [userStarRating, setUserStarRating] = useState<number | null>(null);
  const { data, isError, isLoading } = useFetchData({id: "65f78cf9cfd9792120517a34"});

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

  return (
    <div className={classes.recipeDetails}>
      <div>
        <h2>Jabłecznik Stracciatella</h2>
        <div>
          <Rating
            name="half-rating-read"
            value={starValue}
            precision={0.5}
            readOnly
          ></Rating>
        </div>
      </div>
      <div className={classes.recipeGeneralInfo}>
        <div>
          <p>Autor</p>
          <p>Paweł</p>
        </div>
        <div>
          <p>Kategoria</p>
          <p>Ciasto</p>
        </div>
        <div>
          <p>Czas przygotowania</p>
          <p>60 min</p>
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
          <li>masło</li>
          <li>cukier</li>
          <li>mąka</li>
          <li>...</li>
        </ul>
      </div>
      <div className={classes.preparation}>
        <p>Przygotowanie:</p>
        <ol>
          <li>
            Żurawinę zalej wrzątkiem, gdy napęcznieje odsącz na sicie. Gruszki
            umyj, obierz, usuń gniazda nasienne i pokrój w plastry. Skrop sokiem
            z wyciśniętej cytryny.
          </li>
          <li>
            Do kielicha miksera kuchennego przesiej mąkę, dodaj cukier, proszek
            do pieczenia i wymieszaj. Następnie dodaj miękkie masło, jajka i
            połącz składniki.
          </li>
          <li>...</li>
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
