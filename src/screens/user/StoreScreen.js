import React, { useRef, useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import StoreStyles from "../../styles/user/StoreScreen";
import { Colors } from "../../styles/Colors";
import api from "../../services/api";

// 🔥 COMPONENTES DE ANIMAÇÃO
import Confetti from "../../components/Confetti";
import FloatingCard from "../../components/FloatingPurchaseCard";
import PurchaseSuccessModal from "../../components/PurchaseSuccessModal";

export default function StoreScreen({ navigation }) {
  const headerRef = useRef(null);
  const listRef = useRef(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState(null);

  // HUD
  const [wallet, setWallet] = useState(0);
  const [gems, setGems] = useState(0);

  // 🎉 Estados de animação
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFloating, setShowFloating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 🔄 Recarregar dados ao focar a tela
  useFocusEffect(
    useCallback(() => {
      fetchItems();
      fetchWallet();

      if (headerRef.current) headerRef.current.fadeInDown(800);
      if (listRef.current) listRef.current.fadeInUp(800);
    }, [])
  );

  // 📌 Buscar itens reais da loja
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await api.get("/store/items");
      setItems(res.data);
    } catch (err) {
      console.log("Erro ao carregar itens:", err);
      Alert.alert("Erro", "Não foi possível carregar os itens da loja.");
    } finally {
      setLoading(false);
    }
  };

  // 💰 Buscar wallet e gems do usuário
  const fetchWallet = async () => {
    try {
      const res = await api.get("/wallet");
      setWallet(res.data.COINS ?? 0);
      setGems(res.data.GEMS ?? 0);
    } catch (err) {
      console.log("Erro ao carregar wallet:", err);
    }
  };

  // 💰 Comprar item (AGORA COM ANIMAÇÕES)
  const handlePurchase = async (item) => {
    try {
      setBuyingId(item.ID);
      setSelectedItem(item);

      const res = await api.post("/store/purchase", { itemId: item.ID });

      // 🎉 TRIGGER DAS ANIMAÇÕES
      setShowConfetti(true);
      setShowFloating(true);
      setShowModal(true);

      setTimeout(() => setShowFloating(false), 1800);
      setTimeout(() => setShowConfetti(false), 2500);

      // atualizar
      await fetchItems();
      await fetchWallet();
    } catch (err) {
      console.log("Erro na compra:", err.response?.data || err);

      if (err.response?.status === 400) {
        return Alert.alert("Saldo insuficiente", "Você não tem moedas suficientes.");
      }
      Alert.alert("Erro", "Não foi possível completar a compra.");
    } finally {
      setBuyingId(null);
    }
  };

  // 🎨 Render de cada item
  const renderStoreItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      delay={index * 120}
      style={StoreStyles.itemCard}
    >
      <View style={StoreStyles.itemHeader}>
        <View style={[StoreStyles.gemIcon, { backgroundColor: Colors.gemPink }]} />
        <Text style={StoreStyles.itemPrice}>{item.PRICE} Moedas</Text>
      </View>

      <View style={StoreStyles.itemIcon}>
        <Text style={{ fontSize: 28 }}>🛒</Text>
      </View>

      <Text style={StoreStyles.itemTitle}>{item.NAME}</Text>
      <Text style={StoreStyles.itemDescription}>{item.DESCRIPTION || "Sem descrição."}</Text>

      <TouchableOpacity
        activeOpacity={0.85}
        style={StoreStyles.buyButton}
        onPress={() => handlePurchase(item)}
        disabled={buyingId === item.ID}
      >
        {buyingId === item.ID ? <ActivityIndicator color="#fff" /> : <Text style={StoreStyles.buyButtonText}>Comprar Item</Text>}
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundDark, Colors.backgroundLight]}
      style={StoreStyles.safeArea}
    >
      {/* 🎉 Confete global */}
      <Confetti visible={showConfetti} />

      {/* 🪄 Card flutuante */}
      <FloatingCard visible={showFloating} item={selectedItem} />

      {/* 🎊 Modal de sucesso */}
      <PurchaseSuccessModal visible={showModal} onClose={() => setShowModal(false)} />

      {/* HUD */}
      <View style={hudStyles.hudContainer}>
        <View style={hudStyles.hudBox}>
          <Text style={hudStyles.hudIcon}>💰</Text>
          <Text style={hudStyles.hudText}>{wallet}</Text>
        </View>

        <View style={hudStyles.hudBox}>
          <Text style={hudStyles.hudIcon}>💎</Text>
          <Text style={hudStyles.hudText}>{gems}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <Animatable.View ref={headerRef} style={StoreStyles.storeHeader}>
          <Text style={StoreStyles.title}>Olá, Jennifer</Text>
          <Text style={StoreStyles.subtitle}>Bem-vindo(a) à loja! Escolha itens incríveis para evoluir na jornada.</Text>
        </Animatable.View>

        {/* LISTA */}
        <Animatable.View ref={listRef} style={{ flex: 1 }}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />
          ) : (
            <FlatList
              data={items}
              renderItem={renderStoreItem}
              keyExtractor={(item) => item.ID.toString()}
              contentContainerStyle={StoreStyles.listContainer}
            />
          )}
        </Animatable.View>
      </View>
    </LinearGradient>
  );
}

// HUD Styles
const hudStyles = {
  hudContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 18,
    paddingHorizontal: 18,
    paddingTop: 25,
  },
  hudBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  hudIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  hudText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};