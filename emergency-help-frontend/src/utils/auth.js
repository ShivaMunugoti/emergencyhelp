export const saveUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getToken = () => {
  const user = getUser();
  return user?.token;
};
