import Rating from "@mui/material/Rating";
import { Author, Category } from "../../../utils/types";
import { displayDate } from "../../../utils/displayDate";

type RecipeGeneralInfoProps = {
  title: string;
  author: Author;
  category: Category;
  preparationTime: number;
  date: Date;
  averageRating: number;
  img: string;
};

const RecipeGeneralInfo = ({
  title,
  author,
  category,
  preparationTime,
  date,
  averageRating,
  img,
}: RecipeGeneralInfoProps) => {
  return (
    <div className="flex flex-col">
      <div>
        <h2>{title}</h2>
        <Rating
          className="mt-7 mb-7"
          name="half-rating-read"
          value={averageRating}
          precision={0.5}
          readOnly
        ></Rating>
      </div>
      <br />
      <div className="flex flex-col 2xl:flex-row text-xs md:text-base justify-center mt-2 gap-10 lg:gap-10">
        <div className="flex justify-between gap-10">
          <div className="lg:flex-1 bg-white rounded-3xl border border-gray-300 px-5 shadow-md w-[6rem] lg:w-[10rem]">
            <h4>Autor</h4>
            <p>{author.username}</p>
          </div>
          <div className="lg:flex-1 bg-white rounded-3xl border border-gray-300 px-5 shadow-md w-[6rem] lg:w-[10rem]">
            <h4>Kategoria</h4>
            <p>{category.name}</p>
          </div>
        </div>
        <div className="flex justify-between gap-10">
          <div className="lg:flex-1 bg-white rounded-3xl border border-gray-300 px-5 shadow-md w-[6rem] lg:w-[10rem]">
            <h4>Czas przygotowania</h4>
            <p>{preparationTime} minut</p>
          </div>
          <div className="lg:flex-1 bg-white rounded-3xl border border-gray-300 px-5 shadow-md w-[6rem] lg:w-[10rem]">
            <h4>Utworzono</h4>
            <p>{displayDate(new Date(date))}</p>
          </div>
        </div>
      </div>
      <br />
      <div className="aspect-w-1 aspect-h-1 overflow-hidden">
        <img
          src={img}
          alt="Zdjęcie przepisu"
          className="w-[60vw] mt-6 mb-3 object-cover object-center rounded-2xl border border-solid border-red-300 shadow-md"
        />
      </div>
    </div>
  );
};

export default RecipeGeneralInfo;
