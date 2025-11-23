import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import AboutStyles from "../../styles/user/AboutScreen";

export default function AboutScreen() {
  const commitHash = "30ced303aed17dc7f486c8e6a07f0fb1612440bf";

  return (
    <ScrollView style={AboutStyles.safeArea}>
      <View style={AboutStyles.container}>

        {/* Header com logo */}
        <View style={AboutStyles.header}>
          <Image
            source={require("../../../assets/icon.png")} // troque pela sua logo se quiser
            style={AboutStyles.logo}
            resizeMode="contain"
          />
          <Text style={AboutStyles.title}>Sobre o Aplicativo</Text>
        </View>

        {/* Descrição */}
        <Text style={AboutStyles.description}>
          O CP2APPAI é um aplicativo criado para facilitar o acompanhamento de metas,
          desempenho e produtividade, integrando gamificação e tecnologia para tornar
          o processo mais divertido e eficiente.
        </Text>

        <Text style={AboutStyles.description}>
          Este app faz parte do projeto acadêmico desenvolvido em conjunto com a FIAP,
          utilizando React Native, Node.js, OracleDB e diversas tecnologias modernas.
        </Text>

        {/* Card de informações */}
        <View style={AboutStyles.card}>
          <Text style={AboutStyles.cardTitle}>Informações do Sistema</Text>

          <View style={AboutStyles.row}>
            <Text style={AboutStyles.label}>Versão:</Text>
            <Text style={AboutStyles.value}>1.0.0</Text>
          </View>

          <View style={AboutStyles.row}>
            <Text style={AboutStyles.label}>Commit Hash:</Text>
            <Text style={AboutStyles.value}>{commitHash}</Text>
          </View>

          <View style={AboutStyles.row}>
            <Text style={AboutStyles.label}>Backend:</Text>
            <Text style={AboutStyles.value}>Online</Text>
          </View>

          <View style={AboutStyles.row}>
            <Text style={AboutStyles.label}>API Deploy:</Text>
            <Text style={AboutStyles.value}>
              futurodotrabalho-gs-2025-backend.onrender.com
            </Text>
          </View>
        </View>

        {/* Rodapé */}
        <Text style={AboutStyles.footer}>
          Desenvolvido com ❤️ por Lucas Martins & FIAP — 2025
        </Text>

      </View>
    </ScrollView>
  );
}
