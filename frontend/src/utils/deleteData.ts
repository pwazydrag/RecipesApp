export const deleteData = async (target: string, token: string) => {
  const response = await fetch(target, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return { status: response.status };
};
