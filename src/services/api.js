import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://futurodotrabalho-gs-2025-backend.onrender.com/api",
});

// 🔐 Insere token automaticamente
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("@token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
