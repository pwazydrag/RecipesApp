import classes from "./Actions.module.css";

const Actions = () => {
  return (
    <div className={classes.actions}>
      <div>
        <button>Ulubione</button>
      </div>
      <div>
        <button>Oceń</button>
      </div>
      <div>
        <button>Pobierz</button>
      </div>
    </div>
  );
};

export default Actions;
