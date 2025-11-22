import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppTabsUser from "./AppTabsUser";
import HistoryScreen from "../screens/user/HistoryScreen";
import InventoryScreen from "../screens/user/InventoryScreen"; // <-- nova tela

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AppTabsUser" component={AppTabsUser} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Inventory" component={InventoryScreen} />
    </Stack.Navigator>
  );
}
