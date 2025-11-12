import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

// 🔹 Navegações
import DrawerNavigator from "./DrawerNavigator"; // Drawer que contém as Tabs
import AppTabs from "./AppTabs"; // Mantido para uso dentro do Drawer

// 🔹 Telas públicas
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { user, loading } = useContext(AuthContext);

  // Enquanto o app carrega os dados do usuário (AsyncStorage)
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1a1a2e",
        }}
      >
        <ActivityIndicator size="large" color="#c738fb" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // 🔒 Usuário logado → entra na navegação com Drawer (que contém as Tabs)
        <Stack.Screen name="AppDrawer" component={DrawerNavigator} />
      ) : (
        // 🔓 Usuário não logado → telas públicas
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
