export const updateData = async (
  target: string,
  data: object,
  token: string
) => {
  const response = await fetch(target, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ data }),
  });

  const responseData = await response.json();
  return { data: responseData, status: response.status };
};
