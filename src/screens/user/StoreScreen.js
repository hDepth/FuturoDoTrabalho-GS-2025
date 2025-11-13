import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import StoreStyles from "../../styles/user/StoreScreen";
import { Colors } from "../../styles/Colors";

const MOCK_ITEMS = [
  {
    id: "1",
    name: "Bomba de Prazo",
    description: "Explode o prazo de um questionário...",
    price: 15,
    gemColor: Colors.gemPink,
  },
  {
    id: "2",
    name: "Rubi",
    description: "Acrescenta 10 rubis ao seu inventário",
    price: 25,
    gemColor: "#FF0000",
  },
  {
    id: "3",
    name: "Esmeralda",
    description: "Adiciona 10 esmeraldas ao seu inventário",
    price: 15,
    gemColor: Colors.gemGreen,
  },
];

export default function StoreScreen({ navigation }) {
  const handlePurchase = (item) => {
    console.log("Comprando:", item.name);
  };

  const renderStoreItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={800}
      delay={index * 150}
      style={StoreStyles.itemCard}
    >
      {/* Header do Card com Gema */}
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

      {/* Ícone principal do item */}
      <View style={StoreStyles.itemIcon}>
        <Text style={{ fontSize: 28 }}>💎</Text>
      </View>

      {/* Descrição */}
      <Text style={StoreStyles.itemTitle}>{item.name}</Text>
      <Text style={StoreStyles.itemDescription}>{item.description}</Text>

      {/* Botão de Compra com animação de toque */}
      <Animatable.View animation="pulse" iterationCount="infinite" duration={4000}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={StoreStyles.buyButton}
          onPressIn={(e) =>
            e.target.setNativeProps({
              style: { transform: [{ scale: 0.95 }] },
            })
          }
          onPressOut={(e) =>
            e.target.setNativeProps({
              style: { transform: [{ scale: 1 }] },
            })
          }
          onPress={() => handlePurchase(item)}
        >
          <Text style={StoreStyles.buyButtonText}>Comprar Item</Text>
        </TouchableOpacity>
      </Animatable.View>
    </Animatable.View>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundDark, Colors.backgroundLight]}
      style={StoreStyles.safeArea}
    >
      <View style={{ flex: 1 }}>
        {/* Header da Loja */}
        <Animatable.View
          animation="fadeInDown"
          duration={800}
          style={StoreStyles.storeHeader}
        >
          <Text style={StoreStyles.title}>Olá, Jennifer</Text>
          <Text style={StoreStyles.subtitle}>
            Bem-vindo(a) à nossa loja. Aqui você encontra itens mágicos...
          </Text>

          {/* Imagem/ícone decorativo */}
          <Animatable.View
            animation="swing"
            iterationCount="infinite"
            duration={6000}
            style={StoreStyles.headerImage}
          >
            <Text style={{ fontSize: 36 }}>🧙‍♀️</Text>
          </Animatable.View>
        </Animatable.View>

        {/* Lista de Itens */}
        <Animatable.View animation="fadeInUp" duration={800} delay={200}>
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
