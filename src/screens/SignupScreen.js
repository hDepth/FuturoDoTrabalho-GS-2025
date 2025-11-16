import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  ActivityIndicator,
  Animated,
  Alert,
  Keyboard,
} from "react-native";
import api from "../services/api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/SignupScreen";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default user

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  const validateEmail = (text) => {
    setEmail(text);
    const regex = /\S+@\S+\.\S+/;
    setEmailValid(regex.test(text));
  };

  const validatePassword = (text) => {
    setPassword(text);
    setPasswordValid(text.length >= 6);
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

  const handleSignup = async () => {
    setApiError(null);
    Keyboard.dismiss();

    if (name.trim().length < 3) {
      setApiError("O nome deve ter pelo menos 3 caracteres");
      triggerShake();
      return;
    }
    if (!emailValid) {
      setApiError("Digite um email válido");
      triggerShake();
      return;
    }
    if (!passwordValid) {
      setApiError("A senha deve ter no mínimo 6 caracteres");
      triggerShake();
      return;
    }

    setLoading(true);

    try {
      // POST direto para a API (não chama AuthContext.signup, para evitar auto-login)
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      // sucesso
      setLoading(false);
      Alert.alert("Sucesso", "Registro efetuado com sucesso. Faça login.", [
        {
          text: "Ir para login",
          onPress: () => navigation.navigate("Login", { email, password }),
        },
      ]);
    } catch (err) {
      setLoading(false);

      // tenta extrair mensagem da API
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Erro ao cadastrar";

      setApiError(msg);
      triggerShake();
    }
  };

  // interpolation for shake
  const translateX = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-8, 8],
  });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/icon.png")} style={styles.logo} />
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>Comece sua jornada 💪</Text>
        </View>

        <Animated.View style={[styles.form, { transform: [{ translateX }] }]}>
          {/* NOME */}
          <Text style={styles.label}>Nome</Text>
          <View style={[styles.inputWrapper, name.length > 0 && name.length < 3 && { borderColor: "#ff4d4d" }, name.length >= 3 && { borderColor: "#4dff7a" }]}>
            <MaterialCommunityIcons name="account-outline" size={22} color="#c6c6e6" style={{ marginRight: 8 }} />
            <TextInput style={styles.input} placeholder="Digite seu nome" placeholderTextColor="#a0a0c0" value={name} onChangeText={setName} />
          </View>

          {/* EMAIL */}
          <Text style={styles.label}>E-mail</Text>
          <View style={[styles.inputWrapper, emailValid === false && { borderColor: "#ff4d4d" }, emailValid === true && { borderColor: "#4dff7a" }]}>
            <MaterialCommunityIcons name="email-outline" size={22} color="#c6c6e6" style={{ marginRight: 8 }} />
            <TextInput style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#a0a0c0" value={email} keyboardType="email-address" autoCapitalize="none" onChangeText={validateEmail} />
          </View>

          {/* SENHA */}
          <Text style={styles.label}>Senha</Text>
          <View style={[styles.inputWrapper, passwordValid === false && { borderColor: "#ff4d4d" }, passwordValid === true && { borderColor: "#4dff7a" }]}>
            <MaterialCommunityIcons name="lock-outline" size={22} color="#c6c6e6" style={{ marginRight: 8 }} />
            <TextInput style={styles.input} placeholder="Crie uma senha" placeholderTextColor="#a0a0c0" secureTextEntry={!passwordVisible} value={password} onChangeText={validatePassword} />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <MaterialCommunityIcons name={passwordVisible ? "eye-off-outline" : "eye-outline"} size={22} color="#999" />
            </TouchableOpacity>
          </View>

          {/* ROLE SELECT */}
          <Text style={[styles.label, { marginTop: 8 }]}>Tipo de conta</Text>
          <View style={styles.roleRow}>
            <TouchableOpacity
              style={[
                styles.roleChip,
                role === "user" ? { borderColor: "#4dff7a", backgroundColor: "rgba(13,255,130,0.06)" } : null,
              ]}
              onPress={() => setRole("user")}
            >
              <Text style={[styles.roleText, role === "user" && { color: "#4dff7a" }]}>Usuário</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleChip,
                role === "admin" ? { borderColor: "#00ffc3", backgroundColor: "rgba(0,255,195,0.06)" } : null,
              ]}
              onPress={() => setRole("admin")}
            >
              <Text style={[styles.roleText, role === "admin" && { color: "#00ffc3" }]}>Administrador</Text>
            </TouchableOpacity>
          </View>

          {/* API ERROR */}
          {apiError ? <Text style={styles.errorText}>{apiError}</Text> : null}

          {/* BOTÃO CADASTRAR */}
          <TouchableOpacity style={[styles.button, loading && { opacity: 0.8 }]} onPress={handleSignup} disabled={loading}>
            {loading ? <ActivityIndicator size="small" color="#1a1a2e" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
          </TouchableOpacity>

          {/* LINK LOGIN */}
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 20 }}>
            <Text style={styles.linkText}>
              Já tem uma conta? <Text style={styles.linkHighlight}>Entrar</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
