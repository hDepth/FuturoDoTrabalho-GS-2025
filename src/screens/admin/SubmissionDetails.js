import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Spacing, Typography } from "../../styles/Colors";
import styles from "../../styles/admin/SubmissionDetails";
import api from "../../services/api";

export default function SubmissionDetails({ route, navigation }) {
  const { submissionId } = route.params || {};
  const [submission, setSubmission] = useState(null);
  const [goal, setGoal] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/submissions/${submissionId}`);
      const s = mapSub(res.data);
      setSubmission(s);

      const gRes = await api.get(`/goals/${s.goal_id}`);
      const g = gRes.data;
      setGoal({
        id: g.ID ?? g.id,
        title: g.TITLE ?? g.title,
        description: g.DESCRIPTION ?? g.description,
        xp_reward: g.XP_REWARD ?? g.xp_reward,
        coins_reward: g.COINS_REWARD ?? g.coins_reward,
        gems_reward: g.GEMS_REWARD ?? g.gems_reward,
      });

      const uRes = await api.get(`/users/${s.user_id}`);
      const u = uRes.data;
      setUser({
        id: u.ID ?? u.id,
        name: u.NAME ?? u.name,
        email: u.EMAIL ?? u.email,
        role: u.ROLE ?? u.role,
      });
    } catch (err) {
      console.log("Erro ao buscar submission:", err);
      Alert.alert("Erro", "Não foi possível carregar a submissão.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [submissionId]);

  const handleApprove = async () => {
    if (!submission) return;
    setProcessing(true);
    try {
      await api.patch(`/submissions/${submission.id}/approve`);
      Alert.alert("Sucesso", "Submissão aprovada e recompensas aplicadas.");
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao aprovar:", err);
      Alert.alert("Erro", "Não foi possível aprovar.");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!submission) return;
    setProcessing(true);
    try {
      await api.patch(`/submissions/${submission.id}/reject`);
      Alert.alert("Sucesso", "Submissão rejeitada.");
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao rejeitar:", err);
      Alert.alert("Erro", "Não foi possível rejeitar.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Avaliar Submissão</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View animation="fadeInUp" duration={400} style={styles.submissionCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.submissionTitle}>
                Usuário: {user?.name ?? `ID ${submission.user_id}`}
              </Text>
              <Text style={styles.submissionMeta}>Meta ID: {submission.goal_id}</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.statusText}>{submission.status?.toUpperCase()}</Text>
              <Text style={styles.submissionMeta}>
                {submission.created_at
                  ? new Date(submission.created_at).toLocaleString()
                  : ""}
              </Text>
            </View>
          </View>

          {goal && (
            <View style={{ marginTop: Spacing.md }}>
              <Text style={[styles.submissionTitle, { marginBottom: 6 }]}>{goal.title}</Text>
              <Text style={styles.submissionMeta}>{goal.description}</Text>
              <Text style={[styles.submissionMeta, { marginTop: 8 }]}>
                Recompensas: {goal.coins_reward} moedas · {goal.gems_reward} gemas · {goal.xp_reward} XP
              </Text>
            </View>
          )}

          <View style={{ marginTop: Spacing.md }}>
            <Text style={styles.sectionTitle}>Evidência</Text>

            {submission.evidence_url ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(submission.evidence_url).catch(() =>
                      Alert.alert("Erro", "Não foi possível abrir a URL.")
                    )
                  }
                >
                  <Image
                    source={{ uri: submission.evidence_url }}
                    style={styles.evidenceImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                <Text style={[styles.submissionMeta, { marginTop: 8 }]} numberOfLines={3}>
                  {submission.evidence_url}
                </Text>
              </>
            ) : (
              <Text style={styles.submissionMeta}>Sem evidência.</Text>
            )}
          </View>

          <View style={{ marginTop: Spacing.md }}>
            <Text style={styles.sectionTitle}>Comentário</Text>
            <Text style={styles.submissionMeta}>{submission.comment_text ?? "-"}</Text>
          </View>

          <View style={[styles.buttonRow, { marginTop: Spacing.xl }]}>
            <TouchableOpacity
              style={[styles.approveButton, processing && { opacity: 0.6 }]}
              disabled={processing}
              onPress={() =>
                Alert.alert("Confirmar", "Aprovar essa submissão?", [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Aprovar", onPress: handleApprove },
                ])
              }
            >
              <Text style={styles.buttonText}>Aprovar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.rejectButton, processing && { opacity: 0.6 }]}
              disabled={processing}
              onPress={() =>
                Alert.alert("Confirmar", "Rejeitar essa submissão?", [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Rejeitar", onPress: handleReject },
                ])
              }
            >
              <Text style={styles.buttonText}>Rejeitar</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}
