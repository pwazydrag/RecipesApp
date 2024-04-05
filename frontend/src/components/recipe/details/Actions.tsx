import classes from "./Actions.module.css";
import RateRecipe from "./RateRecipe";

const Actions = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between lg:justify-center items-center lg:gap-64">
      <br />
      <div className="flex flex-col bg-[#f4e8e8fe] rounded-3xl border border-gray-300 p-6 lg:px-12 shadow-md w-[13rem]">
        <h3 className="whitespace-nowrap">Zapisz przepis</h3>
        <button type="button" className={`${classes.favBtn}`}>
          Ulubione
        </button>
      </div>
      <div>
        <RateRecipe />
      </div>
      <br />
    </div>
  );
};

export default Actions;
