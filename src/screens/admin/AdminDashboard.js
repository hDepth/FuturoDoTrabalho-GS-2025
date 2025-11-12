import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../../styles/Colors";

export default function AdminDashboard({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundDark }}>
      <ScrollView contentContainerStyle={{ padding: Spacing.lg }}>
        <Text style={[Typography.title, { marginBottom: Spacing.md }]}>
          Painel do Administrador
        </Text>
        <Text style={[Typography.body, { marginBottom: Spacing.lg, color: Colors.textSecondary }]}>
          Gerencie metas, recompensas e avaliações de forma rápida.
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.backgroundLight,
            padding: Spacing.lg,
            borderRadius: 16,
            marginBottom: Spacing.md,
          }}
          onPress={() => navigation.navigate("ManageGoals")}
        >
          <MaterialCommunityIcons name="target" size={28} color={Colors.primary} />
          <Text style={[Typography.subtitle, { marginTop: 8 }]}>Gerenciar Metas</Text>
          <Text style={Typography.caption}>Crie, edite e atribua metas aos colaboradores.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.backgroundLight,
            padding: Spacing.lg,
            borderRadius: 16,
            marginBottom: Spacing.md,
          }}
          onPress={() => navigation.navigate("ManageRewards")}
        >
          <MaterialCommunityIcons name="gift" size={28} color={Colors.secondary} />
          <Text style={[Typography.subtitle, { marginTop: 8 }]}>Gerenciar Recompensas</Text>
          <Text style={Typography.caption}>Adicione ou remova itens disponíveis na loja.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.backgroundLight,
            padding: Spacing.lg,
            borderRadius: 16,
            marginBottom: Spacing.md,
          }}
          onPress={() => navigation.navigate("ReviewSubmissions")}
        >
          <MaterialCommunityIcons name="check-decagram" size={28} color={Colors.gemBlue} />
          <Text style={[Typography.subtitle, { marginTop: 8 }]}>Avaliar Submissões</Text>
          <Text style={Typography.caption}>Aprove ou rejeite metas concluídas pelos usuários.</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
