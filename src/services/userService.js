import axiosClient from "./axiosClient";

export const fetchUsers = async () => {
  const response = await axiosClient.get("/api/v1/users");
  return response.data;
};

export const createUser = async (data) => {
  const response = await axiosClient.post("/api/v1/users", data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await axiosClient.put(`/api/v1/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axiosClient.delete(`/api/v1/users/${id}`);
  return response.data;
};
