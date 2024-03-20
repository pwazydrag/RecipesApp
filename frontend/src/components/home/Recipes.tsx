import { Link } from "react-router-dom";
import { Recipe } from "../../hooks/useFetchRecipe";

const Recipes = ({ data }: { data: Recipe[] }) => {
  return (
    <div>
      <ul>
        {data.map((recipe) => (
          <li key={recipe._id}>
            <Link to={`details/${recipe._id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
