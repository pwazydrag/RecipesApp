import Favorite from "./Favorite";
import RateRecipe from "./RateRecipe";

const Actions = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between lg:justify-center items-center lg:gap-64">
      <br />
      <Favorite />
      <RateRecipe />
      <br />
    </div>
  );
};

export default Actions;
