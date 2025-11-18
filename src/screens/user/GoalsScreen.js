import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import GoalsStyles from "../../styles/user/GoalsScreen";
import { Colors } from "../../styles/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function GoalsScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  // tabs: 'pendentes' | 'concluidos' | 'rejeitadas'
  const [activeTab, setActiveTab] = useState("pendentes");
  const [goals, setGoals] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // submission modal state
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [currentGoalToSubmit, setCurrentGoalToSubmit] = useState(null);
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // animated background
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
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
  }, []);

  const bgInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.backgroundDark, Colors.backgroundLight],
  });

  // map API goal (uppercase) -> view model
  const mapApiGoal = (g) => ({
    id: g.ID ?? g.id,
    title: g.TITLE ?? g.title,
    description: g.DESCRIPTION ?? g.description,
    xp_reward: g.XP_REWARD ?? g.xp_reward ?? 0,
    coins_reward: g.COINS_REWARD ?? g.coins_reward ?? 0,
    gems_reward: g.GEMS_REWARD ?? g.gems_reward ?? 0,
    created_at: g.CREATED_AT ?? g.created_at,
  });

  // fetch goals and user's submissions
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [goalsRes, subsRes] = await Promise.all([api.get("/goals"), api.get("/submissions/mine")]);
      const goalsData = Array.isArray(goalsRes.data) ? goalsRes.data.map(mapApiGoal) : [];
      const subsData = Array.isArray(subsRes.data) ? subsRes.data : [];

      // normalize submissions (API returns uppercase fields)
      const normalizedSubs = subsData.map((s) => ({
        id: s.ID ?? s.id,
        user_id: s.USER_ID ?? s.user_id,
        goal_id: s.GOAL_ID ?? s.goal_id,
        evidence_url: s.EVIDENCE_URL ?? s.evidence_url,
        comment_text: s.COMMENT_TEXT ?? s.comment_text,
        status: (s.STATUS ?? s.status ?? "").toLowerCase(),
        awarded_xp: s.AWARDED_XP ?? s.awarded_xp ?? 0,
        awarded_coins: s.AWARDED_COINS ?? s.awarded_coins ?? 0,
        awarded_gems: s.AWARDED_GEMS ?? s.awarded_gems ?? 0,
        created_at: s.CREATED_AT ?? s.created_at,
      }));

      setGoals(goalsData);
      setSubmissions(normalizedSubs);
    } catch (err) {
      console.log("Erro ao buscar metas/submissions:", err);
      Alert.alert("Erro", "Não foi possível carregar metas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // derive tab lists
  const submittedGoalIds = new Set(submissions.map((s) => s.goal_id));
  const pendentes = goals.filter((g) => !submittedGoalIds.has(g.id));
  const concluidos = submissions
    .filter((s) => s.status === "approved")
    .map((s) => {
      const goal = goals.find((g) => g.id === s.goal_id);
      return { submission: s, goal };
    });
  const rejeitadas = submissions
    .filter((s) => s.status === "rejected")
    .map((s) => {
      const goal = goals.find((g) => g.id === s.goal_id);
      return { submission: s, goal };
    });

  // render tab buttons
  const renderTabButton = (tabName, text) => (
    <Animatable.View animation="bounceIn" duration={800} key={tabName} style={{ alignItems: "center" }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setActiveTab(tabName)}
        style={[GoalsStyles.tabButton, activeTab === tabName && GoalsStyles.tabButtonActive]}
      >
        <Text style={[GoalsStyles.tabText, activeTab === tabName && GoalsStyles.tabTextActive]}>{text}</Text>
      </TouchableOpacity>
      {activeTab === tabName && <View style={GoalsStyles.activeTabIndicator} />}
    </Animatable.View>
  );

  // open submit modal
  const openSubmitModal = (goal) => {
    setCurrentGoalToSubmit(goal);
    setEvidenceUrl("");
    setComment("");
    setSubmitModalVisible(true);
  };

  // POST /submissions
  const handleSubmitEvidence = async () => {
    if (!currentGoalToSubmit) return;
    if (!evidenceUrl.trim()) {
      Alert.alert("Atenção", "Insira a URL da evidência.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        goalId: currentGoalToSubmit.id,
        evidenceUrl: evidenceUrl.trim(),
        comment: comment?.trim() || "",
      };

      await api.post("/submissions", payload);

      // refresh everything
      await fetchAll();
      setSubmitModalVisible(false);
      Alert.alert("Sucesso", "Submissão enviada. Aguarde aprovação.");
    } catch (err) {
      console.log("Erro ao enviar submissão:", err);
      Alert.alert("Erro", "Não foi possível enviar a submissão.");
    } finally {
      setSubmitting(false);
    }
  };

  // render goal card (pendentes)
  const renderGoalCard = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" duration={700} delay={index * 120} style={{ flex: 1 }}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={GoalsStyles.goalCard}
        onPress={() => openSubmitModal(item)}
        onPressIn={(e) =>
          e.target?.setNativeProps?.({
            style: { transform: [{ scale: 0.96 }] },
          })
        }
        onPressOut={(e) =>
          e.target?.setNativeProps?.({
            style: { transform: [{ scale: 1 }] },
          })
        }
      >
        <Animatable.View animation="pulse" iterationCount="infinite" easing="ease-in-out" duration={2000 + index * 200} style={[GoalsStyles.gemIcon, { backgroundColor: item.iconColor ?? Colors.gemBlue }]} />
        <Text style={GoalsStyles.goalCardTitle}>{item.title}</Text>
        <Text style={{ marginTop: 6, ...GoalsStyles.tabText, textAlign: "center", color: Colors.textSecondary }}>
          {item.coins_reward ?? 0} moedas · {item.gems_reward ?? 0} gemas · {item.xp_reward ?? 0} XP
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  // render list depending on tab
  const renderList = () => {
    if (loading) {
      return (
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }

    if (activeTab === "pendentes") {
      if (pendentes.length === 0) {
        return (
          <Animatable.View animation="fadeInUp" delay={300} style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={{ color: Colors.textSecondary }}>Sem metas pendentes no momento.</Text>
          </Animatable.View>
        );
      }

      return <FlatList data={pendentes} renderItem={renderGoalCard} keyExtractor={(i) => String(i.id)} numColumns={2} contentContainerStyle={GoalsStyles.listContainer} />;
    }

    if (activeTab === "concluidos") {
      if (concluidos.length === 0) {
        return (
          <Animatable.View animation="fadeInUp" delay={300} style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={{ color: Colors.textSecondary }}>Nenhuma meta aprovada ainda.</Text>
          </Animatable.View>
        );
      }

      return (
        <FlatList
          data={concluidos}
          keyExtractor={(item) => String(item.submission.id)}
          renderItem={({ item, index }) => (
            <Animatable.View animation="fadeInUp" duration={700} delay={index * 120} style={GoalsStyles.goalCard}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View>
                  <Text style={GoalsStyles.goalTitle}>{item.goal?.title ?? "Meta removida"}</Text>
                  <Text style={GoalsStyles.goalDate}>Aprovada em: {item.submission.created_at ? new Date(item.submission.created_at).toLocaleString() : "-"}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={GoalsStyles.goalDate}>{item.submission.awarded_xp ?? 0} XP</Text>
                  <Text style={GoalsStyles.goalDate}>{item.submission.awarded_coins ?? 0} moedas</Text>
                  <Text style={GoalsStyles.goalDate}>{item.submission.awarded_gems ?? 0} gemas</Text>
                </View>
              </View>
            </Animatable.View>
          )}
          contentContainerStyle={GoalsStyles.listContainer}
        />
      );
    }

    // rejeitadas
    if (rejeitadas.length === 0) {
      return (
        <Animatable.View animation="fadeInUp" delay={300} style={{ marginTop: 40, alignItems: "center" }}>
          <Text style={{ color: Colors.textSecondary }}>Sem submissões rejeitadas.</Text>
        </Animatable.View>
      );
    }

    return (
      <FlatList
        data={rejeitadas}
        keyExtractor={(item) => String(item.submission.id)}
        renderItem={({ item, index }) => (
          <Animatable.View animation="fadeInUp" duration={700} delay={index * 120} style={GoalsStyles.goalCard}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View>
                <Text style={GoalsStyles.goalTitle}>{item.goal?.title ?? "Meta removida"}</Text>
                <Text style={GoalsStyles.goalDate}>Rejeitada em: {item.submission.created_at ? new Date(item.submission.created_at).toLocaleString() : "-"}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={GoalsStyles.goalDate}>{item.submission.comment_text ?? ""}</Text>
              </View>
            </View>
          </Animatable.View>
        )}
        contentContainerStyle={GoalsStyles.listContainer}
      />
    );
  };

  return (
    <LinearGradient colors={[Colors.backgroundDark, Colors.backgroundLight]} style={GoalsStyles.safeArea}>
      <Animated.View style={[GoalsStyles.container, { backgroundColor: bgInterpolation, flex: 1 }]}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" duration={800} style={GoalsStyles.header}>
          <View>
            <Text style={GoalsStyles.title}>Olá, {user?.name ?? "Usuário"}</Text>
            <Text style={GoalsStyles.subtitle}>Aqui você encontra as missões...</Text>
          </View>
          <View style={GoalsStyles.headerIcon}>
            <Text style={{ color: Colors.primary, fontSize: 24 }}>⚗️</Text>
          </View>
        </Animatable.View>

        {/* Tabs */}
        <Animatable.View animation="fadeIn" delay={300} duration={700} style={GoalsStyles.tabContainer}>
          {renderTabButton("pendentes", "Pendentes")}
          {renderTabButton("concluidos", "Concluídos")}
          {renderTabButton("rejeitadas", "Rejeitadas")}
        </Animatable.View>

        {/* Lista */}
        <Animatable.View key={activeTab} animation="fadeInUp" duration={700} style={{ flex: 1 }}>
          {renderList()}
        </Animatable.View>

        {/* Floating history button */}
        <TouchableOpacity
          style={GoalsStyles.floatingHistoryButton}
          onPress={() => navigation.navigate("History")}
          activeOpacity={0.9}
        >
          <MaterialCommunityIcons name="history" size={20} color={Colors.text} />
        </TouchableOpacity>

        {/* SUBMISSION MODAL */}
        <Modal transparent animationType="fade" visible={submitModalVisible} onRequestClose={() => setSubmitModalVisible(false)}>
          <View style={GoalsStyles.modalOverlay}>
            <Animatable.View animation="zoomIn" duration={300} style={GoalsStyles.modalContainer}>
              <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Text style={GoalsStyles.modalTitle}>Enviar Evidência</Text>
                <Text style={{ color: Colors.textSecondary, marginBottom: 8 }}>{currentGoalToSubmit?.title}</Text>

                <TextInput
                  style={GoalsStyles.input}
                  placeholder="Cole a URL da imagem (ex: https://...)"
                  placeholderTextColor={Colors.textSecondary}
                  value={evidenceUrl}
                  onChangeText={setEvidenceUrl}
                  autoCapitalize="none"
                />

                <TextInput
                  style={[GoalsStyles.input, { height: 80 }]}
                  placeholder="Comentário (opcional)"
                  placeholderTextColor={Colors.textSecondary}
                  value={comment}
                  onChangeText={setComment}
                  multiline
                />

                <View style={GoalsStyles.modalButtons}>
                  <Pressable style={GoalsStyles.cancelButton} onPress={() => setSubmitModalVisible(false)}>
                    <Text style={GoalsStyles.cancelText}>Cancelar</Text>
                  </Pressable>

                  <Pressable
                    style={GoalsStyles.saveButton}
                    onPress={handleSubmitEvidence}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <ActivityIndicator color={Colors.text} />
                    ) : (
                      <Animatable.Text animation="pulse" iterationCount="infinite" duration={1500} style={GoalsStyles.saveText}>
                        Enviar
                      </Animatable.Text>
                    )}
                  </Pressable>
                </View>
              </KeyboardAvoidingView>
            </Animatable.View>
          </View>
        </Modal>
      </Animated.View>
    </LinearGradient>
  );
}
