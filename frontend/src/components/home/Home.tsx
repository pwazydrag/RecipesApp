import { Recipe } from "../../utils/types";
import BestRecipes from "./BestRecipes";
import NewestRecipes from "./NewestRecipes";

const Home = ({ data }: { data: Recipe[] }) => {
  return (
    <div className="w-8/12 mx-auto">
      <NewestRecipes data={data} />
      <BestRecipes data={data} />
    </div>
  );
};

export default Home;
