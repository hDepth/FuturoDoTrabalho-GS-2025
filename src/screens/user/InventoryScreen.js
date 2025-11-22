import React, { useCallback, useState } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import api from "../../services/api";
import { Colors } from "../../styles/Colors";
import styles from "../../styles/user/InventoryScreen";

function formatDate(iso) {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

export default function InventoryScreen({ navigation }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const res = await api.get("/store/purchases");
      // response is an array of purchases as you showed
      setPurchases(res.data || []);
    } catch (err) {
      console.error("Erro ao carregar compras:", err);
      Alert.alert("Erro", "Não foi possível carregar seu inventário.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPurchases();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPurchases();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    // item fields: ID, USER_ID, ITEM_ID, STATUS, CLAIMED_AT, RESOLVED_AT, NAME, IMAGE_URL
    const status = item.STATUS ?? "PENDING";
    const code = `REQ-${item.ID}-${String(item.USER_ID).padStart(4, "0")}`;

    return (
      <Animatable.View animation="fadeInUp" style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.itemThumb}>
            {item.IMAGE_URL ? (
              <Image source={{ uri: item.IMAGE_URL }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>📦</Text>
              </View>
            )}
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.itemTitle}>{item.NAME}</Text>
            <Text style={styles.itemMeta}>Pedido: #{item.ID} • Item #{item.ITEM_ID}</Text>
            <Text style={styles.itemMeta}>Solicitado em: {formatDate(item.CLAIMED_AT)}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View>
            <Text style={[styles.status, status === "PENDING" ? styles.statusPending : styles.statusDone]}>
              {status}
            </Text>
            <Text style={styles.small}>Resolvido em: {item.RESOLVED_AT ? formatDate(item.RESOLVED_AT) : "-"}</Text>
          </View>

          <View style={styles.comprovante}>
            <Text style={styles.codeLabel}>Comprovante</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.codeBox}
              onPress={() => {
                // simples ação: mostra código para retirada (pode trocar por copiar)
                Alert.alert("Comprovante", `Código para retirada:\n\n${code}`);
              }}
            >
              <Text style={styles.codeText}>{code}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  };

  return (
    <LinearGradient colors={[Colors.backgroundDark, Colors.backgroundLight]} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 18 }}>
        <Animatable.View animation="fadeInDown" duration={700} style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meu Inventário</Text>
          <Text style={styles.headerSubtitle}>Comprovantes de itens solicitados</Text>
        </Animatable.View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 40 }} />
        ) : purchases.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nenhum comprovante encontrado</Text>
            <Text style={styles.emptyText}>Você ainda não solicitou itens na loja.</Text>
            <TouchableOpacity style={styles.goStore} onPress={() => navigation.navigate("Store")}>
              <Text style={styles.goStoreText}>Ir para a Loja</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={purchases}
            keyExtractor={(p) => p.ID.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 30 }}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </LinearGradient>
  );
}
