import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import HomeStyles from '../styles/HomeScreen';

// Supondo que você usará ícones, por exemplo:
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function HomeScreen({ navigation }) {
  // Dados mocados. Substitua pelo AuthContext ou dados da API.
  const user = {
    name: 'Jennifer',
    xp: 269,
    coins: 110,
    gems: 75,
  };

  return (
    <View style={HomeStyles.safeArea}>
      <ScrollView style={HomeStyles.container}>
        <Text style={HomeStyles.title}>Olá, {user.name}</Text>
        <Text style={HomeStyles.subtitle}>Bem-vindo(a) de volta!</Text>

        {/* Resumo de XP e Moedas */}
        <View style={HomeStyles.statsContainer}>
          <View style={HomeStyles.statBox}>
            <MaterialCommunityIcons name="star-four-points" size={24} color={HomeStyles.xpIcon.color} />
            <Text style={HomeStyles.statText}>{user.xp} XP</Text>
          </View>
          <View style={HomeStyles.statBox}>
            <MaterialCommunityIcons name="cash" size={24} color={HomeStyles.coinIcon.color} />
            <Text style={HomeStyles.statText}>{user.coins} Moedas</Text>
          </View>
          <View style={HomeStyles.statBox}>
            <MaterialCommunityIcons name="diamond" size={24} color={HomeStyles.gemIcon.color} />
            <Text style={HomeStyles.statText}>{user.gems} Gemas</Text>
          </View>
        </View>

        {/* Card de Ranking */}
        <TouchableOpacity 
          style={HomeStyles.card} 
          onPress={() => navigation.navigate('Goals')} // Supondo que 'Ranking' esteja no Tab Navigator
        >
          <Text style={HomeStyles.cardTitle}>Ranking da Turma</Text>
          <Text style={HomeStyles.cardContent}>Você está em 3º lugar! Continue assim.</Text>
        </TouchableOpacity>

        {/* Card de Metas */}
        <TouchableOpacity 
          style={HomeStyles.card} 
          onPress={() => navigation.navigate('Goals')}
        >
          <Text style={HomeStyles.cardTitle}>Suas Metas</Text>
          <Text style={HomeStyles.cardContent}>Você tem 3 metas pendentes. Toque para ver.</Text>
        </TouchableOpacity>

         {/* Card da Loja */}
         <TouchableOpacity 
          style={HomeStyles.card} 
          onPress={() => navigation.navigate('Store')}
        >
          <Text style={HomeStyles.cardTitle}>Loja de Recompensas</Text>
          <Text style={HomeStyles.cardContent}>Novos itens disponíveis! Confira.</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}