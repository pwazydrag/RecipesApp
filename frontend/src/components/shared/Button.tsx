type ButtonProps = {
  type: "submit" | "reset" | "button";
  text: string;
  mode?: "normal" | "ingrPrep";
  onClick?: () => void;
};

const Button = ({ type, text, mode = "normal", onClick }: ButtonProps) => {
  if (mode === "ingrPrep") {
    return (
      <button
        type={type}
        onClick={onClick}
        className="self-end px-3 lg:px-6 py-3 mt-8 text-base cursor-pointer rounded-3xl border-none text-white
            bg-[#a19b98] hover:transition-all duration-700 hover:ease-in-out hover:bg-[#80c5ed]"
      >
        {text}
      </button>
    );
  } else {
    return (
      <button
        type={type}
        onClick={onClick}
        className="self-center px-6 py-4 text-base cursor-pointer rounded-3xl border-none text-white
            bg-[#f2580a] hover:transition-all duration-700 hover:ease-in-out hover:bg-[#2e8b57]"
      >
        {text}
      </button>
    );
  }
};

export default Button;
