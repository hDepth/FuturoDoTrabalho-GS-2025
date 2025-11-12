import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Sempre inicia deslogado (limpa sessão toda vez)
  useEffect(() => {
    const resetUser = async () => {
      try {
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

  // 🔐 Login fake (define papel com base no e-mail)
  const login = async (email, password) => {
    try {
      const role = email.includes("admin") ? "admin" : "user";
      const fakeUser = { id: Date.now(), name: "Usuário Demo", email, role };

      // 👉 Durante o desenvolvimento, NÃO salvamos no AsyncStorage
      // await AsyncStorage.setItem("@user", JSON.stringify(fakeUser));

      setUser(fakeUser);
      return true;
    } catch (error) {
      console.log("Erro ao logar:", error);
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const fakeUser = { id: Date.now(), name, email, role: "user" };
      // await AsyncStorage.setItem("@user", JSON.stringify(fakeUser));
      setUser(fakeUser);
      return true;
    } catch (error) {
      console.log("Erro ao cadastrar:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // await AsyncStorage.removeItem("@user");
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
