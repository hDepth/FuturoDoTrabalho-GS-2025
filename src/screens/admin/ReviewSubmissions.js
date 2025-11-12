import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Colors, Spacing, Typography } from "../../styles/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ReviewSubmissions() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundDark }}>
      <ScrollView contentContainerStyle={{ padding: Spacing.lg }}>
        <Text style={[Typography.title, { marginBottom: Spacing.md }]}>Avaliar Submissões</Text>
        <Text style={[Typography.caption, { marginBottom: Spacing.lg }]}>
          Analise e aprove as metas concluídas pelos colaboradores.
        </Text>

        <View
          style={{
            backgroundColor: Colors.backgroundLight,
            padding: Spacing.md,
            borderRadius: 12,
            marginBottom: Spacing.md,
          }}
        >
          <Text style={Typography.subtitle}>Usuário: Jennifer</Text>
          <Text style={Typography.caption}>Meta: Finalizar módulo React Native</Text>

          <View style={{ flexDirection: "row", marginTop: Spacing.sm, justifyContent: "space-between" }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.success,
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 8,
              }}
            >
              <Text style={[Typography.subtitle, { color: Colors.text }]}>Aprovar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.error,
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 8,
              }}
            >
              <Text style={[Typography.subtitle, { color: Colors.text }]}>Rejeitar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
