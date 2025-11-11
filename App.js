import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet, Text, StatusBar } from 'react-native';

// Importa os componentes de contexto e navegação que você criou:
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import AuthNavigator from './src/routes/AuthStack';
import AppTabs from './src/routes/AppTabs';

// Componente que decide qual stack mostrar (o Root Navigator)
const RootNavigator = () => {
  const { user, isLoading, signIn } = useAuth(); // Pega o estado e a função signIn

  // Estado de Carregamento: Enquanto 'isLoading' for true, mostra o loader
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Verificando autenticação...</Text>
      </View>
    );
  }

  // USUÁRIO LOGADO: Se o usuário existir (user !== null), mostra a aplicação principal
  if (user) {
    return <AppTabs />;
  }

  // USUÁRIO DESLOGADO: Se o usuário não existir (user === null), mostra a tela de login
  // IMPORTANTE: Aqui, passamos a função 'signIn' para o AuthNavigator.
  // No próximo passo, a tela de Login usará esta função.
  return <AuthNavigator signIn={signIn} />;
};

// Componente principal que envolve tudo em Provedores
export default function App() {
  return (
    // Garante que o container de navegação esteja no topo
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* Fornece as funções de login/logout para todos os componentes */}
      <AuthProvider>
        {/* Renderiza o navegador correto baseado no estado de login */}
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007BFF',
  }
});