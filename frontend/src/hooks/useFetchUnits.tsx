import { useState, useEffect } from "react";

import { baseUrl } from "../utils/constant";
import { fetchData } from "../utils/fetchData";
import { Unit } from "../utils/types";

const useFetchUnits = () => {
  const [unitsData, setUnitsData] = useState<Unit[] | undefined>();
  const [isUnitError, setIsUnitError] = useState(false);
  const [isUnitLoading, setIsUnitLoading] = useState(true);

  useEffect(() => {
    fetchData(`${baseUrl}/units/`)
      .then((fetchedData) => {
        setUnitsData(fetchedData);
        setIsUnitLoading(false);
      })
      .catch(() => {
        setIsUnitError(true);
        console.error("Fetch error...");
      });
  }, []);

  return { unitsData, isUnitError, isUnitLoading };
};

export default useFetchUnits;
