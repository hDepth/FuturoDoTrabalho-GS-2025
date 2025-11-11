import React, { createContext, useState, useContext, useEffect } from 'react';

// Cria o Contexto de Autenticação
const AuthContext = createContext();

// Hook personalizado para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);

// Provedor do Contexto
export const AuthProvider = ({ children }) => {
  // Estado para simular se o usuário está logado
  // Vamos começar como 'null' (carregando) para simular uma checagem inicial
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simula a checagem inicial de token ao iniciar o app
  useEffect(() => {
    // Aqui no futuro, checaremos o token do usuário no localStorage/SecureStore
    setTimeout(() => {
      // Simula que a checagem terminou
      setIsLoading(false);
      // setUser({ id: '123', name: 'Usuario Mock' }); // Descomente para testar como logado
      setUser(null); // Inicia como deslogado para testar o fluxo de Login
    }, 1500);
  }, []);

  // Simula o login (apenas muda o estado)
  const signIn = async (email, password) => {
    // No futuro, faremos a chamada POST para a API de Backend (.NET/Java)
    console.log(`Tentando login com: ${email} / ${password}`);
    // Simula a resposta da API
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    
    // Sucesso
    setUser({ id: 'mock-user', name: 'Funcionário Gamificado' });
    console.log('Login mockado realizado com sucesso!');
  };

  // Simula o logout (muda o estado para null)
  const signOut = async () => {
    // No futuro, removeremos o token
    await new Promise(resolve => setTimeout(resolve, 500)); 
    setUser(null);
    console.log('Logout mockado realizado.');
  };

  const value = {
    user,
    isLoading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};