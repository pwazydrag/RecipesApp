import Favorite from "./Favorite";
import RateRecipe from "./RateRecipe";

const Actions = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between lg:justify-center items-center md:gap-8 lg:gap-32 xl:gap-64">
      <Favorite />
      <RateRecipe />
    </div>
  );
};

export default Actions;
