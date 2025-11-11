import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
// Você pode usar o 'lucide-react-native' ou 'expo-vector-icons' aqui, mas vamos usar um placeholder por enquanto.

const Tab = createBottomTabNavigator();

// Componentes Mock das Telas Principais (as 5+ telas que precisamos)
const HomeScreen = () => (<View style={styles.screen}><Text style={styles.text}>Tela: 🏠 HOME/DASHBOARD (Logado)</Text></View>);
const GoalsScreen = () => (<View style={styles.screen}><Text style={styles.text}>Tela: 🎯 MINHAS METAS (CRUD)</Text></View>);
const StoreScreen = () => (<View style={styles.screen}><Text style={styles.text}>Tela: 🛒 LOJA DE RECOMPENSAS</Text></View>);
const ChatBotScreen = () => (<View style={styles.screen}><Text style={styles.text}>Tela: 🤖 CHAT IA PRODUTIVIDADE</Text></View>);
const ProfileScreen = () => (<View style={styles.screen}><Text style={styles.text}>Tela: 👤 PERFIL/HISTÓRICO</Text></View>);

const AppTabs = () => {
  return (
    <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#007BFF', // Cor principal da nossa GS
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
        }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Goals" component={GoalsScreen} options={{ title: 'Metas' }} />
      <Tab.Screen name="Store" component={StoreScreen} options={{ title: 'Loja' }} />
      <Tab.Screen name="ChatIA" component={ChatBotScreen} options={{ title: 'Assistente IA' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EBF1F7' },
    text: { fontSize: 18, fontWeight: '600', color: '#0056B3' }
});

export default AppTabs;