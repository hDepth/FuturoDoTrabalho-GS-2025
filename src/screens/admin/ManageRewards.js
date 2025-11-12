import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Spacing, Typography } from "../../styles/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ManageRewards() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundDark }}>
      <ScrollView contentContainerStyle={{ padding: Spacing.lg }}>
        <Text style={[Typography.title, { marginBottom: Spacing.md }]}>Gerenciar Recompensas</Text>
        <Text style={[Typography.caption, { marginBottom: Spacing.lg }]}>
          Adicione novas recompensas e controle o estoque disponível.
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
          <MaterialCommunityIcons name="gift-outline" size={22} color={Colors.text} />
          <Text style={[Typography.subtitle, { color: Colors.text, marginLeft: 8 }]}>
            Nova Recompensa
          </Text>
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: Colors.backgroundLight,
            padding: Spacing.md,
            borderRadius: 12,
          }}
        >
          <Text style={Typography.subtitle}>Camiseta Exclusiva</Text>
          <Text style={Typography.caption}>Custa: 150 moedas</Text>
        </View>
      </ScrollView>
    </View>
  );
}
