import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

type RecipeCardProps = {
  recipeId: string;
  title: string;
  img: string;
  userRating: number;
};

const RecipeCard = ({ recipeId, title, img, userRating }: RecipeCardProps) => {
  const navigate = useNavigate();

  const navigateToRecipe = () => {
    navigate(`/details/${recipeId}`);
  };

  return (
    <div
      onClick={navigateToRecipe}
      className="flex flex-col items-center w-[360px] h-[420px] rounded-2xl shadow shadow-rose-300 overflow-hidden cursor-pointer"
    >
      <figure className="w-full h-[270px] flex justify-center items-center mt-0">
        <img
          src={img}
          alt="Zdjęcie przepisu"
          className="w-full h-full aspect-square object-cover object-center"
        />
      </figure>
      <div className="flex flex-col items-center">
        <h4 className="text-center">{title}</h4>
        <Rating
          name="half-rating-read"
          value={userRating}
          precision={0.5}
          readOnly
        ></Rating>
      </div>
    </div>
  );
};

export default RecipeCard;
