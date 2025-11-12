import React from 'react';
import { View, Text } from 'react-native';
import AboutStyles from '../../styles/user/AboutScreen';

export default function AboutScreen() {
  // Você pode injetar isso via variáveis de ambiente no build
  const commitHash = 'a1b2c3d4e5f6g7h8i9j0'; 

  return (
    <View style={AboutStyles.safeArea}>
      <View style={AboutStyles.container}>
        <Text style={AboutStyles.title}>Sobre o App</Text>
        <Text style={AboutStyles.text}>
          Este aplicativo foi desenvolvido como parte do projeto...
        </Text>
        <Text style={AboutStyles.text}>
          É um sistema de gamificação para gerenciamento de metas e produtividade.
        </Text>
        
        <View style={AboutStyles.infoBox}>
          <Text style={AboutStyles.infoLabel}>Versão:</Text>
          <Text style={AboutStyles.infoValue}>1.0.0</Text>
        </View>

        <View style={AboutStyles.infoBox}>
          <Text style={AboutStyles.infoLabel}>Commit Hash:</Text>
          <Text style={AboutStyles.infoValue}>{commitHash}</Text>
        </View>
      </View>
    </View>
  );
}