import React, { useRef, useCallback, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import StoreStyles from "../../styles/user/StoreScreen";
import { Colors } from "../../styles/Colors";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

// 🔥 COMPONENTES DE ANIMAÇÃO
import Confetti from "../../components/Confetti";
import FloatingCard from "../../components/FloatingPurchaseCard";
import PurchaseSuccessModal from "../../components/PurchaseSuccessModal";

export default function StoreScreen({ navigation }) {
  const headerRef = useRef(null);
  const listRef = useRef(null);

  const { user } = useContext(AuthContext); // pega usuário logado

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

  // Modal detalhe do item (quando usuário aperta o card)
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

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
      setItems(res.data || []);
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

      // se estava no detalhe, fecha o detalhe
      setDetailVisible(false);
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

  // Abre detalhe do item (quando usuário toca no card)
  const openDetail = (item) => {
    setDetailItem(item);
    setDetailVisible(true);
  };

  // Render de cada item — agora o card é 'apertável'
  const renderStoreItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      delay={index * 120}
      style={StoreStyles.itemCard}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => openDetail(item)}
        style={{ flex: 1 }}
      >
        <View style={StoreStyles.itemHeader}>
          <View style={[StoreStyles.gemIcon, { backgroundColor: Colors.gemPink }]} />
          <Text style={StoreStyles.itemPrice}>{item.PRICE} Moedas</Text>
        </View>

        <View style={StoreStyles.itemIcon}>
          {item.IMAGE_URL ? (
            <Image
              source={{ uri: item.IMAGE_URL }}
              style={{ width: 120, height: 120, borderRadius: 12, resizeMode: "cover" }}
            />
          ) : (
            <Text style={{ fontSize: 28 }}>🛒</Text>
          )}
        </View>

        <Text style={StoreStyles.itemTitle}>{item.NAME}</Text>
        <Text style={StoreStyles.itemDescription}>
          {item.DESCRIPTION ? (item.DESCRIPTION.length > 80 ? item.DESCRIPTION.slice(0, 80) + "..." : item.DESCRIPTION) : "Sem descrição."}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          style={StoreStyles.buyButton}
          onPress={() => handlePurchase(item)}
          disabled={buyingId === item.ID}
        >
          {buyingId === item.ID ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={StoreStyles.buyButtonText}>Comprar Item</Text>
          )}
        </TouchableOpacity>
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
          <Text style={StoreStyles.title}>Olá, {user?.name ?? "amigo(a)"}</Text>
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

      {/* MODAL DE DETALHE DO ITEM */}
      <Modal visible={detailVisible} animationType="slide" transparent>
        <View style={detailStyles.backdrop}>
          <Animatable.View animation="slideInUp" duration={320} style={detailStyles.modalBox}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              {detailItem?.IMAGE_URL ? (
                <Image source={{ uri: detailItem.IMAGE_URL }} style={detailStyles.detailImage} />
              ) : (
                <View style={detailStyles.noImage}>
                  <Text style={{ fontSize: 48 }}>🛒</Text>
                </View>
              )}

              <Text style={detailStyles.detailTitle}>{detailItem?.NAME}</Text>
              <Text style={detailStyles.detailPrice}>{detailItem?.PRICE} Moedas</Text>
              <Text style={detailStyles.detailStock}>Estoque: {detailItem?.STOCK ?? 0}</Text>

              <Text style={detailStyles.detailDescription}>
                {detailItem?.DESCRIPTION || "Sem descrição disponível."}
              </Text>

              <View style={{ flexDirection: "row", gap: 12, marginTop: 18 }}>
                <TouchableOpacity
                  style={[detailStyles.actionBtn, { backgroundColor: Colors.secondary }]}
                  onPress={() => {
                    setDetailVisible(false);
                  }}
                >
                  <Text style={detailStyles.actionBtnText}>Fechar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[detailStyles.actionBtn, { backgroundColor: Colors.primary }]}
                  onPress={() => handlePurchase(detailItem)}
                  disabled={buyingId === detailItem?.ID}
                >
                  {buyingId === detailItem?.ID ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={detailStyles.actionBtnText}>Comprar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animatable.View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

// HUD Styles (mantidos)
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

// Estilos locais do modal de detalhe
const detailStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(12,12,20,0.6)",
    justifyContent: "flex-end",
  },
  modalBox: {
    maxHeight: "85%",
    backgroundColor: Colors.backgroundLight,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingBottom: 20,
  },
  detailImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: "cover",
  },
  noImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
  detailTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  detailPrice: {
    color: Colors.secondary,
    fontWeight: "700",
    marginBottom: 6,
  },
  detailStock: {
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  detailDescription: {
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  actionBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
});
