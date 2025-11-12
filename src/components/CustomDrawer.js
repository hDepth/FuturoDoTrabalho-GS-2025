import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";
import DrawerStyles from "../styles/DrawerStyles";
import { Colors } from "../styles/Colors";

export default function CustomDrawer(props) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundDark }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <View style={DrawerStyles.header}>
          <Image
            source={require("../../assets/icon.png")}
            style={DrawerStyles.avatar}
          />
          <Text style={DrawerStyles.name}>{user?.name || "Usuário"}</Text>
          <Text style={DrawerStyles.email}>{user?.email || "email@exemplo.com"}</Text>
        </View>

        <View style={{ flex: 1, paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={DrawerStyles.footer}>
        <TouchableOpacity style={DrawerStyles.logoutBtn} onPress={logout}>
          <MaterialCommunityIcons name="logout" size={20} color={Colors.text} />
          <Text style={DrawerStyles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
