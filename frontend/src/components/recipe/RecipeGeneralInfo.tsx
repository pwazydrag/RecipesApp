import Rating from "@mui/material/Rating";
import classes from "./RecipeGeneralInfo.module.css";
import { Author, Category } from "../../utils/types";
import jablecznik from "./jablecznik.jpg";

type RecipeGeneralInfoProps = {
  title: string;
  author: Author;
  category: Category;
  preparationTime: number;
  date: Date;
  averageRating: number;
};

const RecipeGeneralInfo = ({
  title,
  author,
  category,
  preparationTime,
  date,
  averageRating,
}: RecipeGeneralInfoProps) => {
  return (
    <>
      <div>
        <h2>{title}</h2>
        <div>
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.5}
            readOnly
          ></Rating>
        </div>
      </div>
      <div className={classes.recipeGeneralInfo}>
        <div>
          <p>Autor</p>
          <p>{author.username}</p>
        </div>
        <div>
          <p>Kategoria</p>
          <p>{category.name}</p>
        </div>
        <div>
          <p>Czas przygotowania</p>
          <p>{preparationTime}</p>
        </div>
      </div>
      <div>
        <img src={jablecznik} alt="jablecznik" />
      </div>
    </>
  );
};

export default RecipeGeneralInfo;
