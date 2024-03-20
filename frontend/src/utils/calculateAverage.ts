const calculateAverage = (arr: number[]) => {
  if (!arr || arr.length === 0) {
    return 0;
  }

  const sum = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sum / arr.length;
};

export { calculateAverage };
