import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import StoreStyles from '../../styles/user/StoreScreen';
import { Colors } from '../../styles/Colors'; // Importar Colors para usar no mock

// Dados mocados
const MOCK_ITEMS = [
  { 
    id: '1', 
    name: 'Bomba de Prazo', 
    description: 'Explode o prazo de um questionário...', 
    price: 15, 
    icon: 'bomb', 
    gemColor: Colors.gemPink 
  },
  { 
    id: '2', 
    name: 'Rubi', 
    description: 'Acrescenta 10 rubis ao seu inventário', 
    price: 25, 
    icon: 'ruby', 
    gemColor: '#FF0000' // Cor de rubi
  },
  { 
    id: '3', 
    name: 'Esmeralda', 
    description: 'Adiciona 10 esmeraldas ao seu inventário', 
    price: 15, 
    icon: 'emerald', 
    gemColor: Colors.gemGreen 
  },
];

export default function StoreScreen({ navigation }) {

  const handlePurchase = (item) => {
    // Lógica de compra
    console.log('Comprando:', item.name);
    // Mostrar modal de confirmação, etc.
  };

  const renderStoreItem = ({ item }) => (
    <View style={StoreStyles.itemCard}>
      {/* Header do Card com Gema */}
      <View style={StoreStyles.itemHeader}>
        <View style={[StoreStyles.gemIcon, { backgroundColor: item.gemColor }]} />
        <Text style={StoreStyles.itemPrice}>{item.price} Moedas</Text>
      </View>
      {/* Ícone principal do item (placeholder) */}
      <View style={StoreStyles.itemIcon}>
        <Text></Text>
      </View>
      <Text style={StoreStyles.itemTitle}>{item.name}</Text>
      <Text style={StoreStyles.itemDescription}>{item.description}</Text>
      
      <TouchableOpacity 
        style={StoreStyles.buyButton} 
        onPress={() => handlePurchase(item)}
      >
        <Text style={StoreStyles.buyButtonText}>Comprar Item</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={StoreStyles.safeArea}>
      {/* Header da Loja */}
      <View style={StoreStyles.storeHeader}>
        <Text style={StoreStyles.title}>Olá, Jennifer</Text>
        <Text style={StoreStyles.subtitle}>Bem-vindo(a) à nossa loja. Aqui você encontra itens...</Text>
        {/* Placeholder para a imagem da feiticeira */}
        <View style={StoreStyles.headerImage} />
      </View>

      {/* Lista de Itens */}
      <FlatList
        data={MOCK_ITEMS}
        renderItem={renderStoreItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={StoreStyles.listContainer}
      />
    </View>
  );
}