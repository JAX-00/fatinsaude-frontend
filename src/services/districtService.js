import axiosClient from "./axiosClient";

// Get all districts 
export const fetchDistricts = () =>
  axiosClient.get("/api/v1/districts").then(res => res.data);

// Get one District ny id 
export const fetchDistrictById = (id) =>
  axiosClient.get(`/api/v1/districts/${id}`).then(res => res.data);

// create district 
export const createDistrict = (data) =>
  axiosClient.post("/api/v1/districts", data).then(res => res.data);


// update district
export const updateDistrict = (id, data) =>
  axiosClient.put(`/api/v1/districts/${id}`, data).then(res => res.data);

// delete district 
export const deleteDistrict = (id) =>
  axiosClient.delete(`/api/v1/districts/${id}`).then(res => res.data);

