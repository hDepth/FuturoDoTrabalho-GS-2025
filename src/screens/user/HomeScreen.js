import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeStyles from "../../styles/user/HomeScreen";
import { Colors } from "../../styles/Colors";

export default function HomeScreen({ navigation }) {
  const user = {
    name: "Jennifer",
    xp: 269,
    coins: 110,
    gems: 75,
  };

  // 💫 Estado de animação para o fundo gradiente
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

  // Gradiente animado
  const bgInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.backgroundDark, Colors.backgroundLight],
  });

  // Função para animar toque nos cards
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
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {/* ✨ Textos principais */}
          <Animatable.Text
            animation="fadeInDown"
            duration={800}
            style={HomeStyles.title}
          >
            Olá, {user.name}
          </Animatable.Text>

          <Animatable.Text
            animation="fadeInDown"
            delay={200}
            duration={800}
            style={HomeStyles.subtitle}
          >
            Bem-vindo(a) de volta!
          </Animatable.Text>

          {/* 💎 Ícones com brilho pulsante */}
          <Animatable.View
            animation="fadeInUp"
            delay={400}
            duration={900}
            style={HomeStyles.statsContainer}
          >
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
              <Text style={HomeStyles.statText}>{user.xp} XP</Text>
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
              <Text style={HomeStyles.statText}>{user.coins} Moedas</Text>
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
              <Text style={HomeStyles.statText}>{user.gems} Gemas</Text>
            </Animatable.View>
          </Animatable.View>

          {/* 🫧 Cards com bounce e fade */}
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
                    e.target.setNativeProps({
                      style: { transform: [{ scale: 0.97 }] },
                    })
                  }
                  onPressOut={(e) =>
                    e.target.setNativeProps({
                      style: { transform: [{ scale: 1 }] },
                    })
                  }
                >
                  <Text style={HomeStyles.cardTitle}>{card.title}</Text>
                  <Text style={HomeStyles.cardContent}>{card.text}</Text>
                </TouchableOpacity>
              </Animatable.View>
            </Animatable.View>
          ))}
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}
