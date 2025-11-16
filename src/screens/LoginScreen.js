import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Animated,
  Keyboard,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/LoginScreen";

export default function LoginScreen({ navigation, route }) {
  const { login } = useContext(AuthContext);

  // Prefill from route params (after signup)
  const prefillEmail = route?.params?.email ?? "";
  const prefillPassword = route?.params?.password ?? "";

  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState(prefillPassword);
  const [emailValid, setEmailValid] = useState(prefillEmail ? /\S+@\S+\.\S+/.test(prefillEmail) : null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Animated shake
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // If navigation passes updated params later, fill them
    if (route?.params?.email) setEmail(route.params.email);
    if (route?.params?.password) setPassword(route.params.password);
  }, [route?.params]);

  const validateEmail = (text) => {
    setEmail(text);
    const regex = /\S+@\S+\.\S+/;
    setEmailValid(regex.test(text));
  };

  const triggerShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleLogin = async () => {
    setApiError(null);
    Keyboard.dismiss();

    if (!email || !password) {
      setApiError("Preencha email e senha.");
      triggerShake();
      return;
    }

    if (!emailValid) {
      setApiError("Digite um e-mail válido.");
      triggerShake();
      return;
    }

    if (password.length < 6) {
      setApiError("A senha deve ter pelo menos 6 caracteres.");
      triggerShake();
      return;
    }

    setLoading(true);
    const ok = await login(email, password);

    setLoading(false);

    if (!ok) {
      // AuthContext.login já faz console.log do erro, aqui apenas UX
      setApiError("Email ou senha inválidos.");
      triggerShake();
      return;
    }

    // login true -> AuthContext fará o setUser e RootStack redireciona
  };

  // interpolation for shake
  const translateX = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-8, 8],
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/icon.png")} style={styles.logo} />
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Continue sua jornada 🚀</Text>
        </View>

        <Animated.View style={[styles.form, { transform: [{ translateX }] }]}>
          {/* EMAIL */}
          <Text style={styles.label}>E-mail</Text>
          <View
            style={[
              styles.inputWrapper,
              emailValid === false && { borderColor: "#ff4d4d" },
              emailValid === true && { borderColor: "#4dff7a" },
            ]}
          >
            <MaterialCommunityIcons
              name="email-outline"
              color="#c6c6e6"
              size={22}
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#a0a0c0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={validateEmail}
              returnKeyType="next"
            />
          </View>

          {/* SENHA */}
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons
              name="lock-outline"
              color="#c6c6e6"
              size={22}
              style={{ marginRight: 8 }}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#a0a0c0"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
              returnKeyType="done"
            />

            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <MaterialCommunityIcons
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* API ERROR */}
          {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

          {/* BOTÃO LOGIN */}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.8 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#1a1a2e" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* LINK PARA SIGNUP */}
          <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={{ marginTop: 20 }}>
            <Text style={styles.linkText}>
              Não tem uma conta? <Text style={styles.linkHighlight}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
