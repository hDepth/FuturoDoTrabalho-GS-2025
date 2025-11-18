import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../../styles/Colors";
import api from "../../services/api";
import styles from "../../styles/admin/ReviewSubmissions"; // novo arquivo de styles
import { useIsFocused } from "@react-navigation/native";

export default function ReviewSubmissions({ navigation }) {
  
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // refetch quando voltar para a tela

  // mapeia API (MAIÚSCULAS) -> app
  const mapSub = (s) => ({
    id: s.ID,
    user_id: s.USER_ID,
    goal_id: s.GOAL_ID,
    evidence_url: s.EVIDENCE_URL,
    comment_text: s.COMMENT_TEXT,
    status: (s.STATUS ?? "").toLowerCase(),
    awarded_xp: s.AWARDED_XP,
    awarded_coins: s.AWARDED_COINS,
    awarded_gems: s.AWARDED_GEMS,
    created_at: s.CREATED_AT,
    updated_at: s.UPDATED_AT,
  });

  const fetchSubs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/submissions");
      const data = Array.isArray(res.data) ? res.data.map(mapSub) : [];
      // filtra somente pendentes pra revisão (admin)
      const pendentes = data.filter((d) => d.status === "pending");
      setSubs(pendentes);
    } catch (err) {
      console.log("Erro ao carregar submissões:", err);
      Alert.alert("Erro", "Não foi possível carregar submissões.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) fetchSubs();
  }, [isFocused]);

  const openDetails = (submission) => {
    navigation.getParent().navigate("SubmissionDetails", { 
      submissionId: submission.id 
    });    
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Animatable.Text animation="fadeInDown" duration={600} style={styles.title}>
          Avaliar Submissões
        </Animatable.Text>

        <Animatable.Text animation="fadeInDown" delay={120} duration={600} style={styles.caption}>
          Veja as submissões pendentes e aprove ou rejeite com cuidado.
        </Animatable.Text>

        {loading ? (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : subs.length === 0 ? (
          <Animatable.View animation="fadeInUp" delay={200} style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={{ color: Colors.textSecondary }}>Nenhuma submissão pendente no momento.</Text>
          </Animatable.View>
        ) : (
          subs.map((s, i) => (
            <Animatable.View key={s.id} animation="fadeInUp" delay={250 + i * 80} style={styles.submissionCard}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View>
                  <Text style={styles.submissionTitle}>Submissão #{s.id}</Text>
                  <Text style={styles.submissionMeta}>Meta ID: {s.goal_id} • Usuário ID: {s.user_id}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => openDetails(s)}
                    style={{ marginRight: 12 }}
                    accessibilityLabel="Ver detalhes"
                  >
                    <MaterialCommunityIcons name="chevron-right" size={26} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginTop: Spacing.sm }}>
                <Text style={styles.submissionMeta}>{s.comment_text ?? ""}</Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.approveButton}
                    onPress={async () => {
                      // navega para detalhes com ação direta (para confirmar)
                      openDetails(s);
                    }}
                  >
                    <Text style={styles.buttonText}>Aprovar / Revisar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={async () => {
                      // também abre detalhes (recomendado) — evitar rejeitar sem ver
                      openDetails(s);
                    }}
                  >
                    <Text style={styles.buttonText}>Abrir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animatable.View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
