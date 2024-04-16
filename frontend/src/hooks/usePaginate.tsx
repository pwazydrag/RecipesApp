import { useState } from "react";

const usePaginate = (itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return {
    currentPage,
    itemsPerPage,
    indexOfFirstItem,
    indexOfLastItem,
    paginate,
  };
};

export default usePaginate;
