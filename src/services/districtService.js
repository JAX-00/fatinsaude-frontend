import axiosClient from "./axiosClient";

export const fetchDistricts = () =>
  axiosClient.get("/api/v1/districts").then(res => res.data);
