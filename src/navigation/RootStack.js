import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../contexts/AuthContext";
import AppTabsUser from "./AppTabsUser";
import AppTabsAdmin from "./AppTabsAdmin";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  const { user, loading } = useContext(AuthContext);

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
        user.role === "admin" ? (
          <Stack.Screen name="AppTabsAdmin" component={AppTabsAdmin} />
        ) : (
          <Stack.Screen name="AppTabsUser" component={AppTabsUser} />
        )
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
