import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppTabsAdmin from "./AppTabsAdmin"; // seu arquivo de tabs atual
import SubmissionDetails from "../screens/admin/SubmissionDetails";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Mantemos suas tabs como tela inicial */}
      <Stack.Screen name="AppTabsAdmin" component={AppTabsAdmin} />
      {/* Telas fora das tabs (detalhes) */}
      <Stack.Screen name="SubmissionDetails" component={SubmissionDetails} />
    </Stack.Navigator>
  );
}
