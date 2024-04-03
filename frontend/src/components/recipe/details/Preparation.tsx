import classes from "./Preparation.module.css";

type PreparationProps = {
  preparation: string[];
};

const Preparation = ({ preparation }: PreparationProps) => {
  return (
    <div className={classes.preparation}>
      <p>Przygotowanie:</p>
      <ol>
        {preparation.map((prepStep, index) => (
          <li key={index}>{prepStep}</li>
        ))}
      </ol>
    </div>
  );
};

export default Preparation;
