import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

// RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Server tidak aktif / Network error");
    } else {
      console.error("Error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;