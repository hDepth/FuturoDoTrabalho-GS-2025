import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import GoalsScreen from '../screens/GoalsScreen';
import StoreScreen from '../screens/StoreScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Goals" component={GoalsScreen} options={{ title: 'Metas' }} />
      <Tab.Screen name="Store" component={StoreScreen} options={{ title: 'Loja' }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat IA' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
