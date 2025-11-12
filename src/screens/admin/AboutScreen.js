import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Colors } from "../../styles/Colors";
import styles from "../../styles/admin/AboutScreen";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Sobre o App</Text>
        <Text style={styles.description}>
          Este aplicativo foi desenvolvido pela equipe <Text style={styles.highlight}>FJP</Text> 
          {" "}para a Global Solution 2025-2.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Versão</Text>
          <Text style={styles.sectionText}>1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Commit Hash</Text>
          <Text style={styles.sectionText}>#abc1234</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.sectionText}>
            Um app de produtividade gamificado que utiliza metas, moedas e recompensas
            para motivar os colaboradores a atingirem seus objetivos com mais engajamento.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
