import { Rating } from "./types";

export const calculateAverage = (arr: number[]): number => {
  if (!arr || arr.length === 0) {
    return 0;
  }

  const sum = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sum / arr.length;
};

export const calculateAverageRating = (ratings: Rating[]): number => {
  const values = ratings.map((rating) => rating.value);
  return calculateAverage(values);
};
