export const fetchData = async (target: string) => {
  try {
    const response = await fetch(target);
    if (!response.ok) {
      throw new Error("Something wrong with network response...");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
