import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { signOut } = useAuth(); // Usamos o hook para acessar a função de logout

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text style={styles.subtitle}>Tela: 👤 PERFIL/HISTÓRICO</Text>
      
      {/* Botão para testar o Logout, que volta para a tela de Login */}
      <Button 
        title="Logout" 
        onPress={signOut}
        color="#D9534F"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBF1F7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0056B3',
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 30,
  },
});