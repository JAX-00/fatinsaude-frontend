import axiosClient from "./axiosClient";

const authService = {
  login: async (email, password) => {
    const response = await axiosClient.post("/api/v1/auth/login", { email, password });
    if (response.data.access_token) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },
};

export default authService;
