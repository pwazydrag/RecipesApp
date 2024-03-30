export const postData = async (
  target: string,
  data: object,
  token?: string
) => {
  const response = await fetch(target, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(!!token ? { Authorization: "Bearer " + token } : {}),
    },
    body: JSON.stringify({ data }),
  });

  const responseData = await response.json();
  return { data: responseData, status: response.status };
};

export const postDataAuth = (target: string, data: object) => {
  //const token = localStorage.getItem("token") albo const { token } = useAuth() do przemyślenia
  return postData(target, data, "tokenTutaj");
};

export const postDataNotAuth = (target: string, data: object) => {
  return postData(target, data);
};
