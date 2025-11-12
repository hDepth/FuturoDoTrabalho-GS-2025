import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "../../styles/admin/ProfileScreen";

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="account-cog-outline"
            size={80}
            color="#00ffc3"
          />
          <Text style={styles.name}>{user?.name || "Administrador"}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Função</Text>
          <Text style={styles.sectionText}>Administrador</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permissões</Text>
          <Text style={styles.sectionText}>
            • Criar e atribuir metas{"\n"}
            • Gerenciar recompensas{"\n"}
            • Aprovar ou rejeitar submissões{"\n"}
            • Consultar histórico de progresso
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <MaterialCommunityIcons
            name="logout"
            size={22}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
