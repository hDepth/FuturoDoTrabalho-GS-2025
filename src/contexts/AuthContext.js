import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Simula carregar a sessão salva (ex: após fechar e abrir o app)
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("@user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log("Erro ao carregar usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  // 🔐 Simula login (depois substituímos pela API)
  const login = async (email, password) => {
    try {
      // mock simples de usuário
      const fakeUser = { id: 1, name: "Usuário Demo", email };
      await AsyncStorage.setItem("@user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      return true;
    } catch (error) {
      console.log("Erro ao logar:", error);
      return false;
    }
  };

  // 🆕 Simula cadastro
  const signup = async (name, email, password) => {
    try {
      // mock de resposta de cadastro
      const fakeUser = { id: Date.now(), name, email };
      await AsyncStorage.setItem("@user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      return true;
    } catch (error) {
      console.log("Erro ao cadastrar:", error);
      return false;
    }
  };

  // 🚪 Logout
  const logout = async () => {
    await AsyncStorage.removeItem("@user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
