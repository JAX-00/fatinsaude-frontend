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
