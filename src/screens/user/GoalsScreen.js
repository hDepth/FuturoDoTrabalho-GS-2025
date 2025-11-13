import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import GoalsStyles from "../../styles/user/GoalsScreen";
import { Colors } from "../../styles/Colors";

const MOCK_GOALS = {
  pendentes: [
    { id: "1", title: "Superpoderes", iconColor: Colors.gemPink },
    { id: "2", title: "MVC", iconColor: Colors.gemGreen },
    { id: "3", title: "Ovnis", iconColor: Colors.gemBlue },
  ],
  concluidos: [
    { id: "4", title: "Cadastro", iconColor: Colors.gemGreen },
    { id: "5", title: "AI Character Creator", iconColor: Colors.gemPink },
    { id: "6", title: "Validation e i18n", iconColor: Colors.gemBlue },
  ],
  atrasados: [
    { id: "7", title: "Salon Booking", iconColor: Colors.gemPink },
    { id: "8", title: "Diamante Final", iconColor: Colors.gemBlue },
  ],
};

export default function GoalsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("concluidos");

  const animatedValue = new Animated.Value(0);
  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 6000,
        useNativeDriver: false,
      }),
    ])
  ).start();

  const bgInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.backgroundDark, Colors.backgroundLight],
  });

  const renderTabButton = (tabName, text) => (
    <Animatable.View
      animation="bounceIn"
      duration={800}
      key={tabName}
      style={{ alignItems: "center" }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setActiveTab(tabName)}
        style={[
          GoalsStyles.tabButton,
          activeTab === tabName && GoalsStyles.tabButtonActive,
        ]}
      >
        <Text
          style={[
            GoalsStyles.tabText,
            activeTab === tabName && GoalsStyles.tabTextActive,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
      {activeTab === tabName && <View style={GoalsStyles.activeTabIndicator} />}
    </Animatable.View>
  );

  const renderGoalCard = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={700}
      delay={index * 120}
      style={{ flex: 1 }}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        style={GoalsStyles.goalCard}
        onPressIn={(e) =>
          e.target.setNativeProps({
            style: { transform: [{ scale: 0.96 }] },
          })
        }
        onPressOut={(e) =>
          e.target.setNativeProps({
            style: { transform: [{ scale: 1 }] },
          })
        }
      >
        {/* 💎 Ícone da Gema com pulso */}
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          easing="ease-in-out"
          duration={2000 + index * 200}
          style={[GoalsStyles.gemIcon, { backgroundColor: item.iconColor }]}
        />
        <Text style={GoalsStyles.goalCardTitle}>{item.title}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundDark, Colors.backgroundLight]}
      style={GoalsStyles.safeArea}
    >
      <Animated.View
        style={[
          GoalsStyles.container,
          { backgroundColor: bgInterpolation, flex: 1 },
        ]}
      >
        {/* ✨ Header */}
        <Animatable.View
          animation="fadeInDown"
          duration={800}
          style={GoalsStyles.header}
        >
          <View>
            <Text style={GoalsStyles.title}>Olá, Jennifer</Text>
            <Text style={GoalsStyles.subtitle}>
              Aqui você encontra as missões...
            </Text>
          </View>
          <View style={GoalsStyles.headerIcon}>
            <Text style={{ color: Colors.primary, fontSize: 24 }}>⚗️</Text>
          </View>
        </Animatable.View>

        {/* 🪄 Tabs */}
        <Animatable.View
          animation="fadeIn"
          delay={300}
          duration={700}
          style={GoalsStyles.tabContainer}
        >
          {renderTabButton("pendentes", "Pendentes")}
          {renderTabButton("concluidos", "Concluídos")}
          {renderTabButton("atrasados", "Atrasadas")}
        </Animatable.View>

        {/* 📋 Lista de Metas */}
        <Animatable.View
          key={activeTab}
          animation="fadeInUp"
          duration={700}
          style={{ flex: 1 }}
        >
          <FlatList
            data={MOCK_GOALS[activeTab]}
            renderItem={renderGoalCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={GoalsStyles.listContainer}
          />
        </Animatable.View>
      </Animated.View>
    </LinearGradient>
  );
}
