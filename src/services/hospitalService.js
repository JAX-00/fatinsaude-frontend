import axiosClient from "./axiosClient";

export const fetchHospitals = (districtId) =>
  axiosClient
    .get("/api/v1/hospitals", {
      params: { districtId },
    })
    .then((res) => res.data);
