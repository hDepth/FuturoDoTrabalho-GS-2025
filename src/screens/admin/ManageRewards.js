import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import Icon from "@expo/vector-icons/MaterialIcons";

import RewardsStyles from "../../styles/admin/ManageRewards";
import { Colors } from "../../styles/Colors";
import api from "../../services/api";

export default function AdminRewardsScreen() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      // rota exposta pelo seu backend: /api/admin/store/rewards
      const res = await api.get("/admin/store/rewards");
      setRewards(res.data);
    } catch (err) {
      console.log("Erro ao carregar recompensas:", err);
      Alert.alert("Erro", "Não foi possível carregar as compras.");
    } finally {
      setLoading(false);
    }
  };

  const markReady = async (id) => {
    try {
      setProcessingId(id);
      await api.patch(`/admin/store/rewards/${id}/ready`);
      Alert.alert("OK", "Recompensa marcada como PRONTA.");
      await fetchRewards();
    } catch (err) {
      console.log("Erro ao marcar ready:", err);
      Alert.alert("Erro", "Não foi possível marcar como pronta.");
    } finally {
      setProcessingId(null);
    }
  };

  const markReceived = async (id) => {
    try {
      setProcessingId(id);
      await api.patch(`/admin/store/rewards/${id}/received`);
      Alert.alert("OK", "Recompensa marcada como ENTREGUE.");
      await fetchRewards();
    } catch (err) {
      console.log("Erro ao marcar received:", err);
      Alert.alert("Erro", "Não foi possível marcar como entregue.");
    } finally {
      setProcessingId(null);
    }
  };

  const renderReward = ({ item, index }) => (
    <Animatable.View animation="fadeInUp" duration={480} delay={index * 80} style={RewardsStyles.card}>
      <View style={RewardsStyles.row}>
        <View style={RewardsStyles.left}>
          {item.IMAGE_URL ? (
            <Image source={{ uri: item.IMAGE_URL }} style={RewardsStyles.thumb} />
          ) : (
            <View style={[RewardsStyles.thumb, { justifyContent: "center", alignItems: "center" }]}>
              <Text style={{ color: Colors.textSecondary }}>Sem imagem</Text>
            </View>
          )}

          <View style={{ marginLeft: 12 }}>
            <Text style={RewardsStyles.title}>{item.NAME}</Text>
            <Text style={RewardsStyles.subtitle}>Usuário ID: {item.USER_ID}</Text>
            <Text style={RewardsStyles.subtitle}>Comprado em: {new Date(item.CLAIMED_AT).toLocaleString()}</Text>
          </View>
        </View>

        <View style={RewardsStyles.actions}>
          <Text style={[RewardsStyles.status, item.STATUS === "PENDING" ? { color: Colors.primary } : { color: Colors.success }]}>
            {item.STATUS}
          </Text>

          <TouchableOpacity style={RewardsStyles.smallBtn} onPress={() => markReady(item.ID)} disabled={processingId === item.ID}>
            {processingId === item.ID ? <ActivityIndicator /> : <Icon name="check-circle" size={20} color={Colors.primary} />}
            <Text style={RewardsStyles.smallBtnText}>Pronto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={RewardsStyles.smallBtn} onPress={() => markReceived(item.ID)} disabled={processingId === item.ID}>
            <Icon name="done-all" size={20} color={Colors.secondary} />
            <Text style={RewardsStyles.smallBtnText}>Entregue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );

  return (
    <LinearGradient colors={[Colors.backgroundDark, Colors.backgroundLight]} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ color: Colors.text, fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Compras / Recompensas</Text>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
        ) : (
          <FlatList data={rewards} keyExtractor={(r) => r.ID.toString()} renderItem={renderReward} contentContainerStyle={{ paddingBottom: 120 }} />
        )}
      </View>
    </LinearGradient>
  );
}
