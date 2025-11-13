import React, { useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import StoreStyles from "../../styles/user/StoreScreen";
import { Colors } from "../../styles/Colors";

const MOCK_ITEMS = [
  { id: "1", name: "Bomba de Prazo", description: "Explode o prazo de um questionário...", price: 15, gemColor: Colors.gemPink },
  { id: "2", name: "Rubi", description: "Acrescenta 10 rubis ao seu inventário", price: 25, gemColor: "#FF0000" },
  { id: "3", name: "Esmeralda", description: "Adiciona 10 esmeraldas ao seu inventário", price: 15, gemColor: Colors.gemGreen },
];

export default function StoreScreen({ navigation }) {
  // 🌀 Refs para controlar as animações
  const headerRef = useRef(null);
  const listRef = useRef(null);

  // 🔁 Reexecuta animações sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      if (headerRef.current) headerRef.current.fadeInDown(800);
      if (listRef.current) listRef.current.fadeInUp(800);
    }, [])
  );

  const handlePurchase = (item) => console.log("Comprando:", item.name);

  const renderStoreItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      delay={index * 150}
      style={StoreStyles.itemCard}
    >
      <View style={StoreStyles.itemHeader}>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          easing="ease-in-out"
          duration={2000 + index * 250}
          style={[StoreStyles.gemIcon, { backgroundColor: item.gemColor }]}
        />
        <Text style={StoreStyles.itemPrice}>{item.price} Moedas</Text>
      </View>

      <View style={StoreStyles.itemIcon}>
        <Text style={{ fontSize: 28 }}>💎</Text>
      </View>

      <Text style={StoreStyles.itemTitle}>{item.name}</Text>
      <Text style={StoreStyles.itemDescription}>{item.description}</Text>

      <Animatable.View animation="pulse" iterationCount="infinite" duration={4000}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={StoreStyles.buyButton}
          onPress={() => handlePurchase(item)}
        >
          <Text style={StoreStyles.buyButtonText}>Comprar Item</Text>
        </TouchableOpacity>
      </Animatable.View>
    </Animatable.View>
  );

  return (
    <LinearGradient colors={[Colors.backgroundDark, Colors.backgroundLight]} style={StoreStyles.safeArea}>
      <View style={{ flex: 1 }}>
        <Animatable.View ref={headerRef} style={StoreStyles.storeHeader}>
          <Text style={StoreStyles.title}>Olá, Jennifer</Text>
          <Text style={StoreStyles.subtitle}>
            Bem-vindo(a) à nossa loja. Aqui você encontra itens mágicos...
          </Text>
          <Animatable.View animation="swing" iterationCount="infinite" duration={6000} style={StoreStyles.headerImage}>
            <Text style={{ fontSize: 36 }}>🧙‍♀️</Text>
          </Animatable.View>
        </Animatable.View>

        <Animatable.View ref={listRef}>
          <FlatList
            data={MOCK_ITEMS}
            renderItem={renderStoreItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={StoreStyles.listContainer}
          />
        </Animatable.View>
      </View>
    </LinearGradient>
  );
}
