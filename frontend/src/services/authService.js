import axios from "axios";

const BASE_URL = "http://localhost:8080/auth";

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, { email, password });

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;

  } catch (err) {
    console.error("LOGIN REQUEST FAILED:", err.response ? err.response.data : err);
    throw err;
  }
};

export const register = async (data) => {
  return axios.post(`${BASE_URL}/register`, data);
};

export const logout = () => {
  localStorage.removeItem("token");
};
