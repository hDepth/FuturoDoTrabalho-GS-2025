import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AdminDashboard from "../screens/admin/AdminDashboard";
import ManageGoals from "../screens/admin/ManageGoals";
import ManageRewards from "../screens/admin/ManageRewards";
import ReviewSubmissions from "../screens/admin/ReviewSubmissions";
import ProfileScreen from "../screens/admin/ProfileScreen";
import AboutScreen from "../screens/admin/AboutScreen";

const Tab = createBottomTabNavigator();

export default function AppTabsAdmin() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00ffc3",
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
            case "Dashboard":
              iconName = "view-dashboard-outline";
              break;
            case "ManageGoals":
              iconName = "target";
              break;
            case "ReviewSubmissions":
              iconName = "check-decagram";
              break;
            case "ManageRewards":
              iconName = "gift-outline";
              break;
            case "Profile":
              iconName = "account-cog-outline";
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
      <Tab.Screen name="Dashboard" component={AdminDashboard} options={{ title: "Painel" }} />
      <Tab.Screen name="ManageGoals" component={ManageGoals} options={{ title: "Metas" }} />
      <Tab.Screen name="ReviewSubmissions" component={ReviewSubmissions} options={{ title: "Avaliar" }} />
      <Tab.Screen name="ManageRewards" component={ManageRewards} options={{ title: "Recompensas" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: "Sobre" }} />
    </Tab.Navigator>
  );
}
