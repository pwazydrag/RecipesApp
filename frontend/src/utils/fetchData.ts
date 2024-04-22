export const fetchData = async (target: string) => {
  try {
    const response = await fetch(target);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
