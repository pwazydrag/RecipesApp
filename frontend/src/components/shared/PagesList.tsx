type PagesListProps = {
  arrayLength: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
};

const PagesList = ({ arrayLength, currentPage, paginate }: PagesListProps) => {
  return (
    <ul className="flex justify-center mt-8 mb-8 list-none">
      {Array.from({ length: arrayLength }, (_, i) => (
        <li
          key={i}
          className={`mx-2 cursor-pointer ${
            currentPage === i + 1 ? "font-bold" : ""
          }`}
          onClick={() => paginate(i + 1)}
        >
          {i + 1}
        </li>
      ))}
    </ul>
  );
};

export default PagesList;
