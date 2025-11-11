import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatBotScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assistente de Produtividade</Text>
      <Text style={styles.subtitle}>Tela: 🤖 CHAT IA PRODUTIVIDADE</Text>
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
  },
});