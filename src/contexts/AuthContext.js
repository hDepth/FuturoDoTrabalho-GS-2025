import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Sempre iniciar deslogado (ignora sessão salva)
  useEffect(() => {
    const resetUser = async () => {
      try {
        // Remove qualquer usuário anterior salvo
        await AsyncStorage.removeItem("@user");
        setUser(null);
      } catch (error) {
        console.log("Erro ao limpar usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    resetUser();
  }, []);

  // 🔐 Login fake (pode ser substituído depois pela API real)
  const login = async (email, password) => {
    try {
      const fakeUser = { id: 1, name: "Usuário Demo", email };
      await AsyncStorage.setItem("@user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      return true;
    } catch (error) {
      console.log("Erro ao logar:", error);
      return false;
    }
  };

  // 🆕 Cadastro fake
  const signup = async (name, email, password) => {
    try {
      const fakeUser = { id: Date.now(), name, email };
      await AsyncStorage.setItem("@user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      return true;
    } catch (error) {
      console.log("Erro ao cadastrar:", error);
      return false;
    }
  };

  // 🚪 Logout manual
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      setUser(null);
    } catch (error) {
      console.log("Erro ao deslogar:", error);
    }
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

// Lógica para lembrar login
// const userData = await AsyncStorage.getItem("@user");
// if (userData) setUser(JSON.parse(userData));
