import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppTabs from './AppTabs';
import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppTabs" component={AppTabs} />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: true, title: 'Sobre o App' }}
      />
    </Stack.Navigator>
  );
}
