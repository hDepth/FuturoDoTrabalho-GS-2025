import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import * as Progress from "react-native-progress";
import ProfileStyles from "../../styles/user/ProfileScreen";
import { Colors } from "../../styles/Colors";
import { AuthContext } from "../../contexts/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = React.useContext(AuthContext);

  // Mock de dados do perfil
  const profile = {
    name: user?.name || "Jennifer",
    email: user?.email || "jennifer@empresa.com",
    level: 18,
    xp: 2400,
    xpToNext: 3000,
    metasConcluidas: 42,
    taxaSucesso: "92%",
    tempoDeCasa: "1 ano e 4 meses",
    avatar:
      "https://cdn-icons-png.flaticon.com/512/147/147144.png", // avatar genérico
  };

  const badges = [
    { id: "1", icon: "🏆", title: "Meta Master" },
    { id: "2", icon: "⚡", title: "Produtividade 100%" },
    { id: "3", icon: "💎", title: "5 Semanas de Ouro" },
    { id: "4", icon: "🔥", title: "Constância" },
  ];

  const progress = profile.xp / profile.xpToNext;

  return (
    <LinearGradient
      colors={[Colors.backgroundDark, Colors.backgroundLight]}
      style={ProfileStyles.safeArea}
    >
      <ScrollView
        contentContainerStyle={ProfileStyles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* 👤 Avatar + Nome */}
        <Animatable.View animation="fadeInDown" duration={800} style={ProfileStyles.header}>
          <LinearGradient
            colors={
              profile.level >= 25
                ? [Colors.gemPink, Colors.gemBlue]
                : [Colors.primary, Colors.secondary]
            }
            style={ProfileStyles.avatarBorder}
          >
            <Image source={{ uri: profile.avatar }} style={ProfileStyles.avatar} />
          </LinearGradient>

          <Text style={ProfileStyles.userName}>{profile.name}</Text>
          <Text style={ProfileStyles.userEmail}>{profile.email}</Text>
        </Animatable.View>

        {/* ⭐ Level e XP */}
        <Animatable.View animation="fadeInUp" delay={200} style={ProfileStyles.levelCard}>
          <Text style={ProfileStyles.levelText}>Nível {profile.level}</Text>
          <Progress.Bar
            progress={progress}
            width={null}
            color={Colors.secondary}
            unfilledColor={Colors.grey}
            borderWidth={0}
            height={12}
            borderRadius={8}
          />
          <Text style={ProfileStyles.xpText}>
            {profile.xp}/{profile.xpToNext} XP
          </Text>
        </Animatable.View>

        {/* 🧾 Estatísticas */}
        <Animatable.View animation="fadeInUp" delay={400} style={ProfileStyles.statsContainer}>
          <View style={ProfileStyles.statBox}>
            <Text style={ProfileStyles.statNumber}>{profile.metasConcluidas}</Text>
            <Text style={ProfileStyles.statLabel}>Metas Concluídas</Text>
          </View>
          <View style={ProfileStyles.statBox}>
            <Text style={ProfileStyles.statNumber}>{profile.taxaSucesso}</Text>
            <Text style={ProfileStyles.statLabel}>Taxa de Sucesso</Text>
          </View>
          <View style={ProfileStyles.statBox}>
            <Text style={ProfileStyles.statNumber}>{profile.tempoDeCasa}</Text>
            <Text style={ProfileStyles.statLabel}>Tempo de Casa</Text>
          </View>
        </Animatable.View>

        {/* 🏅 Badges */}
        <Animatable.View animation="fadeInUp" delay={600} style={ProfileStyles.badgeContainer}>
          <Text style={ProfileStyles.sectionTitle}>Conquistas</Text>
          <View style={ProfileStyles.badgeList}>
            {badges.map((badge, index) => (
              <Animatable.View
                key={badge.id}
                animation="pulse"
                iterationCount="infinite"
                delay={index * 400}
                style={ProfileStyles.badgeItem}
              >
                <Text style={ProfileStyles.badgeIcon}>{badge.icon}</Text>
                <Text style={ProfileStyles.badgeText}>{badge.title}</Text>
              </Animatable.View>
            ))}
          </View>
        </Animatable.View>

        {/* ⚙️ Botão de logout */}
        <Animatable.View animation="fadeInUp" delay={800}>
          <TouchableOpacity
            style={ProfileStyles.logoutButton}
            activeOpacity={0.8}
            onPress={logout}
          >
            <Text style={ProfileStyles.logoutButtonText}>Sair do App</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
}
