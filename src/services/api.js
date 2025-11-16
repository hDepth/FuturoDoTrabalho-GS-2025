import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://10.0.2.2:4000/api", // Android Emulator
  // OU use seu IP local se estiver no Expo Go
  // baseURL: "http://SEU-IP:4000/api"
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
