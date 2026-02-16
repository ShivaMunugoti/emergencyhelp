import API from "./api";

// POST: /api/emergency/create
export const createEmergency = async (data) => {
  const res = await API.post("/emergency/create", data);
  return res.data;
};

// GET: /api/emergency/all
export const getAllEmergencies = async () => {
  const res = await API.get("/emergency/all");
  return res.data;
};

// GET: /api/emergency/:id
export const getEmergencyById = async (id) => {
  const res = await API.get(`/emergency/${id}`);
  return res.data;
};

// PUT: /api/emergency/update/:id
export const updateEmergency = async (id, data) => {
  const res = await API.put(`/emergency/update/${id}`, data);
  return res.data;
};

// DELETE: /api/emergency/delete/:id  (only if you have it)
export const deleteEmergency = async (id) => {
  const res = await API.delete(`/emergency/delete/${id}`);
  return res.data;
};
