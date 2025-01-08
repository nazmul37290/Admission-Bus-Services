let id_token: string | null = "";

export const setToken = (token: string) => {
  id_token = token;
};

export const getToken = () => {
  return id_token;
};
