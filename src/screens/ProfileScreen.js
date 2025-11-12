import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import ProfileStyles from '../styles/ProfileScreen';
// import { AuthContext } from '../contexts/AuthContext'; // Você vai precisar disso

export default function ProfileScreen({ navigation }) {
  // const { user, logout } = React.useContext(AuthContext); // Exemplo de como usar o contexto
  
  // Dados mocados
  const user = {
    name: 'Jennifer',
    email: 'jennifer@empresa.com',
  };

  const history = [
    { id: '1', item: 'Bomba de Prazo', date: '10/11/2025' },
    { id: '2', item: 'Rubi', date: '05/11/2025' },
  ];

  const handleLogout = () => {
    // Chamar a função de logout do seu AuthContext
    // logout();
    console.log('Usuário deslogado');
  };

  return (
    <View style={ProfileStyles.safeArea}>
      <ScrollView style={ProfileStyles.container}>
        {/* Avatar e Nome */}
        <View style={ProfileStyles.profileHeader}>
          <View style={ProfileStyles.avatar}>
            <Text style={ProfileStyles.avatarText}>{user.name[0]}</Text>
          </View>
          <Text style={ProfileStyles.userName}>{user.name}</Text>
          <Text style={ProfileStyles.userEmail}>{user.email}</Text>
        </View>

        {/* Histórico de Resgates */}
        <View style={ProfileStyles.section}>
          <Text style={ProfileStyles.sectionTitle}>Histórico de Resgates</Text>
          {history.length > 0 ? (
            history.map(item => (
              <View style={ProfileStyles.historyItem} key={item.id}>
                <Text style={ProfileStyles.historyItemText}>{item.item}</Text>
                <Text style={ProfileStyles.historyItemDate}>{item.date}</Text>
              </View>
            ))
          ) : (
            <Text style={ProfileStyles.historyItemDate}>Nenhum item resgatado ainda.</Text>
          )}
        </View>

        {/* Link para "Sobre" */}
         <TouchableOpacity 
          style={ProfileStyles.logoutButton} // Reutilizando estilo
          onPress={() => navigation.navigate('Sobre')} // Supondo que 'Sobre' está no RootStack
        >
          <Text style={ProfileStyles.logoutButtonText}>Sobre o App</Text>
        </TouchableOpacity>

        {/* Botão de Logout */}
        <TouchableOpacity style={ProfileStyles.logoutButton} onPress={handleLogout}>
          <Text style={ProfileStyles.logoutButtonText}>Sair (Logout)</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}