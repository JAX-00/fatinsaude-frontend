import axiosClient from "./axiosClient";

export const fetchEducation = async () => {
  const response = await axiosClient.get("/api/v1/education");
  return response.data;
};

export const fetchEducationById = async (id) => {
  const response = await axiosClient.get(`/api/v1/education/${id}`);
  return response.data;
};

export const createEducation = async (formData) => {
  const response = await axiosClient.post("/api/v1/education", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateEducation = async (id, formData) => {
  const response = await axiosClient.put(`/api/v1/education/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteEducation = async (id) => {
  const response = await axiosClient.delete(`/api/v1/education/${id}`);
  return response.data;
};
