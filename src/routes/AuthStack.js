import React from 'react';
// IMPORTANTE: Trocamos para a Stack padrão (sem o 'Native') para evitar o erro no Expo Go.
import { createStackNavigator } from '@react-navigation/stack'; 
import { View, Text, StyleSheet } from 'react-native';

const AuthStack = createStackNavigator(); // Mudança aqui!

// Componentes Mock das Telas
// Estes componentes precisam ser importados da pasta screens, mas vou mantê-los aqui
// por um momento, já que você os colocou no arquivo.
const LoginScreen = () => (
    <View style={styles.screen}>
        <Text style={styles.text}>Tela: LOGIN (Acesso Público)</Text>
    </View>
);
const RegisterScreen = () => (
    <View style={styles.screen}>
        <Text style={styles.text}>Tela: CADASTRO (Acesso Público)</Text>
    </View>
);

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator>
            {/* O header está escondido na tela de login, mas estará visível no Cadastro */}
            <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F4F8' },
    text: { fontSize: 18, fontWeight: '600', color: '#1A202C' }
});

export default AuthNavigator;