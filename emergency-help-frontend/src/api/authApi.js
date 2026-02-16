import API from "./api";

// POST: /api/auth/register
export const registerUser = async (data) => {
  // data = { name, email, password }
  const res = await API.post("/auth/register", data);
  return res.data;
};

// POST: /api/auth/login
export const loginUser = async (data) => {
  // data = { email, password }
  const res = await API.post("/auth/login", data);
  return res.data; // { token: "..." }
};
