type PreparationProps = {
  preparation: string[];
};

const Preparation = ({ preparation }: PreparationProps) => {
  return (
    <div className="text-left">
      <h3>Przygotowanie:</h3>
      <ol className="list-none">
        {preparation.map((prepStep, index) => (
          <li key={index} className="ml-[-1.5rem] mt-5">
            <span className="font-medium">Krok {index + 1}:</span> {prepStep}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Preparation;
