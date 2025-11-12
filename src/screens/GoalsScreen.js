import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import GoalsStyles from '../styles/GoalsScreen';
import { Colors } from '../styles/Colors'; // Importar Colors para usar no mock

// Dados mocados
const MOCK_GOALS = {
  pendentes: [
    { id: '1', title: 'Superpoderes', iconColor: Colors.gemPink },
    { id: '2', title: 'MVC', iconColor: Colors.gemGreen },
    { id: '3', title: 'Ovnis', iconColor: Colors.gemGreen },
  ],
  concluidos: [
    { id: '4', title: 'Cadastro', iconColor: Colors.gemGreen },
    { id: '5', title: 'AI Character Creator', iconColor: Colors.gemPink },
    { id: '6', title: 'Validation e i18n', iconColor: Colors.gemGreen },
  ],
  atrasados: [
    { id: '7', title: 'Salon Booking', iconColor: Colors.gemPink },
    { id: '8', title: 'Diamante Final', iconColor: Colors.gemBlue },
  ],
};

export default function GoalsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('concluidos'); // 'pendentes', 'concluidos', 'atrasados'

  const renderTabButton = (tabName, text) => (
    <TouchableOpacity onPress={() => setActiveTab(tabName)}>
      <Text 
        style={[
          GoalsStyles.tabText, 
          activeTab === tabName && GoalsStyles.tabTextActive
        ]}
      >
        {text}
      </Text>
      {activeTab === tabName && <View style={GoalsStyles.activeTabIndicator} />}
    </TouchableOpacity>
  );

  const renderGoalCard = ({ item }) => (
    <TouchableOpacity style={GoalsStyles.goalCard}>
      {/* Ícone da Gema */}
      <View style={[GoalsStyles.gemIcon, { backgroundColor: item.iconColor }]} />
      {/* Imagem de fundo do card (usando uma cor por enquanto) */}
      <View style={GoalsStyles.cardImageBackground} />
      <Text style={GoalsStyles.goalCardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={GoalsStyles.safeArea}>
      <View style={GoalsStyles.container}>
        {/* Header */}
        <View style={GoalsStyles.header}>
          <View>
            <Text style={GoalsStyles.title}>Olá, Jennifer</Text>
            <Text style={GoalsStyles.subtitle}>Aqui você encontra as missões...</Text>
          </View>
          {/* Placeholder para o ícone de caldeirão */}
          <View style={GoalsStyles.headerIcon}>
            <Text> cauldron</Text>
          </View>
        </View>

        {/* Abas de Navegação */}
        <View style={GoalsStyles.tabContainer}>
          {renderTabButton('pendentes', 'Pendentes')}
          {renderTabButton('concluidos', 'Concluídos')}
          {renderTabButton('atrasados', 'Atrasadas')}
        </View>

        {/* Lista de Metas */}
        <FlatList
          data={MOCK_GOALS[activeTab]}
          renderItem={renderGoalCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={GoalsStyles.listContainer}
        />
      </View>
    </View>
  );
}