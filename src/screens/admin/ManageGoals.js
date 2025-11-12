import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Spacing, Typography } from "../../styles/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ManageGoals() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundDark }}>
      <ScrollView contentContainerStyle={{ padding: Spacing.lg }}>
        <Text style={[Typography.title, { marginBottom: Spacing.md }]}>Gerenciar Metas</Text>
        <Text style={[Typography.caption, { marginBottom: Spacing.lg }]}>
          Crie novas metas, edite ou remova as existentes.
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            padding: Spacing.md,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: Spacing.md,
          }}
        >
          <MaterialCommunityIcons name="plus" size={22} color={Colors.text} />
          <Text style={[Typography.subtitle, { color: Colors.text, marginLeft: 8 }]}>
            Nova Meta
          </Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: Colors.backgroundLight,
            padding: Spacing.md,
            borderRadius: 12,
          }}
        >
          <Text style={Typography.subtitle}>Meta: Finalizar módulo React Native</Text>
          <Text style={Typography.caption}>Prazo: 15/11/2025</Text>
        </View>
      </ScrollView>
    </View>
  );
}
