import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import ProfileStyles from "../../styles/user/ProfileScreen";
import { AuthContext } from "../../contexts/AuthContext"; // Import do contexto

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  // Dados mocados (substituídos se houver user real)
  const currentUser = user || {
    name: "Jennifer",
    email: "jennifer@empresa.com",
  };

  const history = [
    { id: "1", item: "Bomba de Prazo", date: "10/11/2025" },
    { id: "2", item: "Rubi", date: "05/11/2025" },
  ];

  const handleLogout = async () => {
    Alert.alert(
      "Sair do App",
      "Tem certeza que deseja encerrar sua sessão?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await logout(); // 🔥 chama a função real do contexto
          },
        },
      ]
    );
  };

  return (
    <View style={ProfileStyles.safeArea}>
      <ScrollView style={ProfileStyles.container}>
        {/* Avatar e Nome */}
        <View style={ProfileStyles.profileHeader}>
          <View style={ProfileStyles.avatar}>
            <Text style={ProfileStyles.avatarText}>
              {currentUser.name[0].toUpperCase()}
            </Text>
          </View>
          <Text style={ProfileStyles.userName}>{currentUser.name}</Text>
          <Text style={ProfileStyles.userEmail}>{currentUser.email}</Text>
        </View>

        {/* Histórico de Resgates */}
        <View style={ProfileStyles.section}>
          <Text style={ProfileStyles.sectionTitle}>Histórico de Resgates</Text>
          {history.length > 0 ? (
            history.map((item) => (
              <View style={ProfileStyles.historyItem} key={item.id}>
                <Text style={ProfileStyles.historyItemText}>{item.item}</Text>
                <Text style={ProfileStyles.historyItemDate}>{item.date}</Text>
              </View>
            ))
          ) : (
            <Text style={ProfileStyles.historyItemDate}>
              Nenhum item resgatado ainda.
            </Text>
          )}
        </View>

        {/* Link para "Sobre" */}
        <TouchableOpacity
          style={[ProfileStyles.logoutButton, { backgroundColor: "#2a2a4e" }]}
          onPress={() => navigation.navigate("About")} // nome da tela deve bater com o AppTabs
        >
          <Text style={ProfileStyles.logoutButtonText}>Sobre o App</Text>
        </TouchableOpacity>

        {/* Botão de Logout */}
        <TouchableOpacity
          style={[ProfileStyles.logoutButton, { backgroundColor: "#c738fb" }]}
          onPress={handleLogout}
        >
          <Text style={ProfileStyles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
