import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomDrawer from "../components/CustomDrawer";
import AppTabs from "./AppTabs";
import ProfileScreen from "../screens/ProfileScreen";
import AboutScreen from "../screens/AboutScreen";
import { Colors } from "../styles/Colors";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: Colors.text,
        drawerInactiveTintColor: Colors.textSecondary,
        drawerStyle: {
          backgroundColor: Colors.backgroundDark,
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 15,
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={AppTabs}
        options={{
          drawerLabel: "Início",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: "Perfil",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerLabel: "Sobre o App",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="information" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
