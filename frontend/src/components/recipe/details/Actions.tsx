import Favorite from "./Favorite";
import RateRecipe from "./RateRecipe";

type ActionsProps = {
  likes: number;
};

const Actions = ({ likes }: ActionsProps) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between lg:justify-center items-center md:gap-8 lg:gap-32 xl:gap-64">
        <Favorite />
        <RateRecipe />
      </div>
      <h2 className="mt-12 text-rose-400">
        {likes === 0 ? "" : `Przepis został dodany do ulubionych ${likes} razy`}
      </h2>
    </div>
  );
};

export default Actions;
