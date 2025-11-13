import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AdminDashboardStyles from "../../styles/admin/AdminDashboard";
import { Colors } from "../../styles/Colors";

const { width } = Dimensions.get("window");

export default function AdminDashboard({ navigation }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  // 🌈 Animação suave do fundo
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const bgInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.backgroundDark, Colors.backgroundLight],
  });

  const CARDS = [
    {
      title: "Gerenciar Metas",
      text: "Crie, edite e atribua metas aos colaboradores.",
      icon: "target",
      color: Colors.primary,
      screen: "ManageGoals",
    },
    {
      title: "Gerenciar Recompensas",
      text: "Adicione ou remova itens disponíveis na loja.",
      icon: "gift",
      color: Colors.secondary,
      screen: "ManageRewards",
    },
    {
      title: "Avaliar Submissões",
      text: "Aprove ou rejeite metas concluídas pelos usuários.",
      icon: "check-decagram",
      color: Colors.gemBlue,
      screen: "ReviewSubmissions",
    },
  ];

  return (
    <Animated.View
      style={[
        AdminDashboardStyles.container,
        { backgroundColor: bgInterpolation },
      ]}
    >
      <ScrollView
        contentContainerStyle={AdminDashboardStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <Animatable.Text
          animation="fadeInDown"
          duration={800}
          style={AdminDashboardStyles.title}
        >
          Painel do Administrador
        </Animatable.Text>

        <Animatable.Text
          animation="fadeInDown"
          delay={200}
          duration={800}
          style={AdminDashboardStyles.subtitle}
        >
          Gerencie metas, recompensas e avaliações de forma rápida.
        </Animatable.Text>

        {/* Cards */}
        {CARDS.map((card, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={400 + index * 200}
            duration={700}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              style={AdminDashboardStyles.card}
              onPress={() => navigation.navigate(card.screen)}
            >
              <Animatable.View
                animation="pulse"
                iterationCount="infinite"
                duration={2500}
                style={[
                  AdminDashboardStyles.iconContainer,
                  { backgroundColor: `${card.color}22` },
                ]}
              >
                <MaterialCommunityIcons
                  name={card.icon}
                  size={28}
                  color={card.color}
                />
              </Animatable.View>

              <View style={{ flex: 1 }}>
                <Text style={AdminDashboardStyles.cardTitle}>{card.title}</Text>
                <Text style={AdminDashboardStyles.cardText}>{card.text}</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
