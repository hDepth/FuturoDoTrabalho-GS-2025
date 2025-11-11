import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

// A tela de Login é a única que precisa receber a função signIn via props ou usar o useAuth()
export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth(); // Usamos o hook para acessar a função de login

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao GS Mobile!</Text>
      <Text style={styles.subtitle}>Tela: LOGIN (Acesso Público)</Text>
      
      {/* Temporariamente, um botão para simular o Login.
        No próximo passo, vamos transformá-lo em um formulário real.
      */}
      <Button 
        title="Simular Login (Ir para Home)" 
        onPress={() => signIn('user@fiap.com', '123456')}
      />

      <Button 
        title="Ir para Cadastro" 
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1A202C',
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 30,
  },
});