import axiosClient from "./axiosClient";

export const fetchHospitals = async (districtId) => {
  try {
    // Kita buat objek params kosong
    const params = {};
    
    // Hanya isi jika districtId ada nilainya
    if (districtId) {
      params.districtId = districtId;
    }

    const response = await axiosClient.get("/api/v1/hospitals", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    throw error;
  }
};

export const filterHospitals = async (districtId, disease, options = {}) => {
  try {
    const params = {};
    if (districtId) params.districtId = districtId;
    if (disease) params.disease = disease;

    const response = await axiosClient.get("/api/v1/hospitals/filter", { 
      params,
      ...options
    });
    return response.data;
  } catch (error) {
    console.error("Error filtering hospitals:", error);
    throw error;
  }
};

export const fetchHospitalById = async (id) => {
  const response = await axiosClient.get(`/api/v1/hospitals/${id}`);
  return response.data;
};

export const createHospital = async (formData) => {
  const response = await axiosClient.post("/api/v1/hospitals", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateHospital = async (id, formData) => {
  const response = await axiosClient.put(`/api/v1/hospitals/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteHospital = async (id) => {
  const response = await axiosClient.delete(`/api/v1/hospitals/${id}`);
  return response.data;
};
