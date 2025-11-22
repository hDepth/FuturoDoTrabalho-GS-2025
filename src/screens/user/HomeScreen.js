import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeStyles from "../../styles/user/HomeScreen";
import { Colors } from "../../styles/Colors";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user: authUser } = useContext(AuthContext);

  const [wallet, setWallet] = useState(null);
  const [loadingWallet, setLoadingWallet] = useState(true);

  // 🍀 Buscar carteira real do usuário
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await api.get("/wallet"); // GET /wallet
        setWallet(res.data);
      } catch (err) {
        console.log("Erro ao buscar carteira:", err.response?.data || err);
      } finally {
        setLoadingWallet(false);
      }
    };

    fetchWallet();
  }, []);

  // 💫 Animação de fundo
  const animatedValue = new Animated.Value(0);
  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 5000,
        useNativeDriver: false,
      }),
    ])
  ).start();

  const bgInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.backgroundDark, Colors.backgroundLight],
  });

  const bounceAnim = {
    from: { scale: 1 },
    to: { scale: 0.95 },
  };

  return (
    <LinearGradient
      colors={[Colors.backgroundDark, Colors.backgroundLight]}
      style={HomeStyles.safeArea}
    >
      <Animated.View
        style={[
          HomeStyles.container,
          { backgroundColor: bgInterpolation, flex: 1 },
        ]}
      >
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 60 }}>
          
          {/* 👋 Saudação */}
          <Animatable.Text
            animation="fadeInDown"
            duration={800}
            style={HomeStyles.title}
          >
            Olá, {authUser?.name || "Carregando..."}
          </Animatable.Text>

          <Animatable.Text
            animation="fadeInDown"
            delay={200}
            duration={800}
            style={HomeStyles.subtitle}
          >
            Bem-vindo(a) de volta!
          </Animatable.Text>

          {/* 💎 Stat Boxes */}
          <Animatable.View
            animation="fadeInUp"
            delay={400}
            duration={900}
            style={HomeStyles.statsContainer}
          >
            {loadingWallet ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <>
                <Animatable.View
                  animation="pulse"
                  iterationCount="infinite"
                  easing="ease-in-out"
                  duration={2000}
                  style={HomeStyles.statBox}
                >
                  <MaterialCommunityIcons
                    name="star-four-points"
                    size={28}
                    color={Colors.primary}
                  />
                  <Text style={HomeStyles.statText}>
                    {wallet?.XP ?? 0} XP
                  </Text>
                </Animatable.View>

                <Animatable.View
                  animation="pulse"
                  iterationCount="infinite"
                  delay={500}
                  duration={2200}
                  easing="ease-in-out"
                  style={HomeStyles.statBox}
                >
                  <MaterialCommunityIcons
                    name="cash"
                    size={28}
                    color={Colors.secondary}
                  />
                  <Text style={HomeStyles.statText}>
                    {wallet?.COINS ?? 0} Moedas
                  </Text>
                </Animatable.View>

                <Animatable.View
                  animation="pulse"
                  iterationCount="infinite"
                  delay={1000}
                  duration={2400}
                  easing="ease-in-out"
                  style={HomeStyles.statBox}
                >
                  <MaterialCommunityIcons
                    name="diamond"
                    size={28}
                    color={Colors.gemBlue}
                  />
                  <Text style={HomeStyles.statText}>
                    {wallet?.GEMS ?? 0} Gemas
                  </Text>
                </Animatable.View>
              </>
            )}
          </Animatable.View>

          {/* 🫧 Cards */}
          {[ 
            {
              title: "Ranking da Turma",
              text: "Você está em 3º lugar! Continue assim.",
              screen: "Goals",
            },
            {
              title: "Suas Metas",
              text: "Você tem 3 metas pendentes. Toque para ver.",
              screen: "Goals",
            },
            {
              title: "Loja de Recompensas",
              text: "Novos itens disponíveis! Confira.",
              screen: "Store",
            },
          ].map((card, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              delay={700 + index * 200}
              duration={800}
            >
              <Animatable.View
                animation={bounceAnim}
                iterationCount={1}
                style={HomeStyles.cardWrapper}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={HomeStyles.card}
                  onPress={() => navigation.navigate(card.screen)}
                  onPressIn={(e) =>
                    e.target.setNativeProps({ style: { transform: [{ scale: 0.97 }] } })
                  }
                  onPressOut={(e) =>
                    e.target.setNativeProps({ style: { transform: [{ scale: 1 }] } })
                  }
                >
                  <Text style={HomeStyles.cardTitle}>{card.title}</Text>
                  <Text style={HomeStyles.cardContent}>{card.text}</Text>
                </TouchableOpacity>
              </Animatable.View>
            </Animatable.View>
          ))}

          {/* 🔔 Botão do Inventário (leva à InventoryScreen) */}
          <Animatable.View
            animation="fadeInUp"
            delay={1200}
            duration={800}
          >
            <Animatable.View
              animation={bounceAnim}
              iterationCount={1}
              style={[HomeStyles.cardWrapper, { marginTop: 8 }]}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                style={[HomeStyles.card, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}
                onPress={() => navigation.navigate("Inventory")}
              >
                <View>
                  <Text style={HomeStyles.cardTitle}>Meu Inventário</Text>
                  <Text style={HomeStyles.cardContent}>Comprovantes de itens solicitados — retire na empresa.</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <MaterialCommunityIcons name="clipboard-list" size={28} color={Colors.primary} />
                </View>
              </TouchableOpacity>
            </Animatable.View>
          </Animatable.View>

        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}
