export const fetchData = async (target: string) => {
  const response = await fetch(target);
  if (!response.ok) {
    throw new Error("Something wrong with network response...");
  }
  const data = await response.json();
  return data;
};
