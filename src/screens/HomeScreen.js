import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard do Funcionário</Text>
      <Text style={styles.subtitle}>Tela: 🏠 HOME/DASHBOARD (Logado)</Text>
      <Text style={styles.info}>Aqui estará o XP, moedas e ranking!</Text>
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
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    color: '#718096',
    fontStyle: 'italic',
  }
});