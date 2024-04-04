import classes from "./Actions.module.css";
import RateRecipe from "./RateRecipe";

const Actions = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between lg:justify-center items-center lg:gap-72">
      <br />
      <div className="flex flex-col bg-[#f4e8e8fe] rounded-3xl border border-gray-300 p-5 shadow-md w-[13rem]">
        <h3>Zapisz przepis</h3>
        <div className="flex gap-3">
          <button type="button" className={`${classes.favBtn} flex-1`}>
            Ulubione
          </button>
          <button type="button" className={`${classes.downloadBtn} flex-1`}>
            Pobierz
          </button>
        </div>
      </div>
      <div>
        <RateRecipe></RateRecipe>
      </div>
      <br />
    </div>
  );
};

export default Actions;
