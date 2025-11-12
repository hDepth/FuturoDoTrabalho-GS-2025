import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/user/HomeScreen";
import GoalsScreen from "../screens/user/GoalsScreen";
import StoreScreen from "../screens/user/StoreScreen";
import ChatScreen from "../screens/user/ChatScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import AboutScreen from "../screens/user/AboutScreen";

const Tab = createBottomTabNavigator();

export default function AppTabsUser() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#c738fb",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#1a1a2e",
          borderTopColor: "#2a2a4e",
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Goals":
              iconName = "target";
              break;
            case "Store":
              iconName = "cart-outline";
              break;
            case "Chat":
              iconName = "chat-processing-outline";
              break;
            case "Profile":
              iconName = "account-outline";
              break;
            case "About":
              iconName = "information-outline";
              break;
            default:
              iconName = "circle-outline";
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
      <Tab.Screen name="Goals" component={GoalsScreen} options={{ title: "Metas" }} />
      <Tab.Screen name="Store" component={StoreScreen} options={{ title: "Loja" }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ title: "Chat IA" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: "Sobre" }} />
    </Tab.Navigator>
  );
}
