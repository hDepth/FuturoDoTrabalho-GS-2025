import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Tela chat / Dashboard</Text>
      <Text style={styles.subtitle}>Resumo de XP, Moedas e Ranking</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
    marginTop: 8,
  },
});
