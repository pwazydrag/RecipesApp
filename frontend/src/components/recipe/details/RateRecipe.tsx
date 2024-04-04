import { ChangeEvent, useEffect, useState } from "react";

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
    <div className="mt-16 md:mt-0 bg-[#f4e8e8fe] rounded-3xl border border-gray-300 p-7 shadow-md w-[12rem]">
      <h3>Oceń przepis!</h3>
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
