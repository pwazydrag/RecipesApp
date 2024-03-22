const displayDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (month < 10) {
    return `${day}.0${month}.${year}`;
  }

  return `${day}.${month}.${year}`;
};

export { displayDate };
