import { ChangeEvent, useEffect, useState } from "react";

import classes from "./RateRecipe.module.css";
import Rating from "@mui/material/Rating";

const RateRecipe = () => {
  const [userStarRating, setUserStarRating] = useState<number | null>(null);

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
    <div>
      <h3>Oceń ten ten przepis!</h3>
      <Rating
        name="userRating"
        value={userStarRating}
        onChange={handleUserStarRating}
        precision={0.5}
      ></Rating>
    </div>
  );
};

export default RateRecipe;
