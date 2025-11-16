import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Carregar sessão salva
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
  
          const normalized = {
            id: parsed.id,
            name: parsed.name,
            email: parsed.email,
            role: parsed.role.toLowerCase(),
          };
  
          setUser(normalized);
        }
      } catch (err) {
        console.log("Erro ao carregar sessão:", err);
      } finally {
        setLoading(false);
      }
    };
  
    loadUser();
  }, []);
  
  
  // LOGIN REAL
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
  
      const normalizedUser = {
        id: user.ID,
        name: user.NAME,
        email: user.EMAIL,
        role: user.ROLE.toLowerCase(), // 🔥 FAZ TUDO FUNCIONAR
      };
  
      await AsyncStorage.setItem("@token", token);
      await AsyncStorage.setItem("@user", JSON.stringify(normalizedUser));
  
      setUser(normalizedUser);
      return true;
    } catch (err) {
      console.log("Erro no login:", err.response?.data || err.message);
      return false;
    }
  };

  // 🆕 REGISTRO REAL
  const signup = async (name, email, password) => {
    try {
      await api.post("/auth/register", { name, email, password });

      // já podemos chamar login automaticamente
      return await login(email, password);
    } catch (err) {
      console.log("Erro no cadastro:", err.response?.data || err.message);
      return false;
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@token");
      await AsyncStorage.removeItem("@user");
      setUser(null);
    } catch (err) {
      console.log("Erro ao deslogar:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
