import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { Colors } from "../../styles/Colors";
import GoalsStyles from "../../styles/user/GoalsScreen";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function HistoryScreen() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const mapSub = (s) => ({
    id: s.ID ?? s.id,
    goal_id: s.GOAL_ID ?? s.goal_id,
    evidence_url: s.EVIDENCE_URL ?? s.evidence_url,
    comment_text: s.COMMENT_TEXT ?? s.comment_text,
    status: (s.STATUS ?? s.status ?? "").toLowerCase(),
    awarded_xp: s.AWARDED_XP ?? s.awarded_xp ?? 0,
    awarded_coins: s.AWARDED_COINS ?? s.awarded_coins ?? 0,
    awarded_gems: s.AWARDED_GEMS ?? s.awarded_gems ?? 0,
    created_at: s.CREATED_AT ?? s.created_at,
  });

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get("/submissions/mine");
      const data = Array.isArray(res.data) ? res.data.map(mapSub) : [];
      setSubs(data);
    } catch (err) {
      console.log("Erro ao buscar histórico:", err);
      Alert.alert("Erro", "Não foi possível carregar o histórico.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[GoalsStyles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (subs.length === 0) {
    return (
      <View style={[GoalsStyles.container, { padding: 24 }]}>
        <Animatable.Text animation="fadeInDown" style={[GoalsStyles.title, { marginBottom: 12 }]}>
          Histórico
        </Animatable.Text>
        <Text style={{ color: Colors.textSecondary }}>Você ainda não enviou nenhuma submissão.</Text>
      </View>
    );
  }

  return (
    <View style={[GoalsStyles.container, { padding: 12 }]}>
      <Animatable.Text animation="fadeInDown" style={[GoalsStyles.title, { marginBottom: 12 }]}>
        Histórico
      </Animatable.Text>

      <FlatList
        data={subs}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <Animatable.View animation="fadeInUp" duration={600} delay={index * 80} style={GoalsStyles.goalCard}>
            <Text style={GoalsStyles.goalTitle}>Meta ID: {String(item.goal_id)}</Text>
            <Text style={GoalsStyles.goalDate}>Status: {item.status}</Text>
            <Text style={GoalsStyles.goalDate}>Enviada em: {item.created_at ? new Date(item.created_at).toLocaleString() : "-"}</Text>
            <Text style={GoalsStyles.goalDate}>Comentário: {item.comment_text ?? "-"}</Text>
            <Text style={GoalsStyles.goalDate}>Recompensa (após aprovação): {item.awarded_xp} XP · {item.awarded_coins} moedas · {item.awarded_gems} gemas</Text>
            <Text style={[GoalsStyles.goalDate, { color: Colors.primary, marginTop: 8 }]}>Evidência: {item.evidence_url}</Text>
          </Animatable.View>
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}
