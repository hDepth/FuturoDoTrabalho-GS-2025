import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../styles/Colors";
import ManageGoalsStyles from "../../styles/admin/ManageGoals";
import api from "../../services/api";

export default function ManageGoals() {
  // -------------------------
  // state
  // -------------------------
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    xp_reward: "",
    coins_reward: "",
    gems_reward: "",
  });

  const [editGoal, setEditGoal] = useState({
    id: null,
    title: "",
    description: "",
    xp_reward: "",
    coins_reward: "",
    gems_reward: "",
  });

  // refs to animate individual items on delete
  const animRefs = useRef({});

  // -------------------------
  // helpers: map API -> app format
  // -------------------------
  const mapApiGoalToView = (g) => ({
    id: g.ID ?? g.id,
    title: g.TITLE ?? g.title,
    description: g.DESCRIPTION ?? g.description,
    xp_reward: g.XP_REWARD ?? g.xp_reward ?? 0,
    coins_reward: g.COINS_REWARD ?? g.coins_reward ?? 0,
    gems_reward: g.GEMS_REWARD ?? g.gems_reward ?? 0,
    created_at: g.CREATED_AT ?? g.created_at,
    updated_at: g.UPDATED_AT ?? g.updated_at,
  });

  // -------------------------
  // fetch goals
  // -------------------------
  const fetchGoals = async () => {
    setLoading(true);
    try {
      const res = await api.get("/goals");
      const data = Array.isArray(res.data) ? res.data : [];
      setGoals(data.map(mapApiGoalToView));
    } catch (err) {
      console.log("Erro ao carregar metas:", err);
      Alert.alert("Erro", "Não foi possível carregar as metas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // -------------------------
  // create goal (POST)
  // -------------------------
  const handleAddGoal = async () => {
    if (!newGoal.title?.trim()) {
      Alert.alert("Atenção", "Preencha o título da meta.");
      return;
    }

    const payload = {
      title: newGoal.title,
      description: newGoal.description || "",
      xp_reward: Number(newGoal.xp_reward) || 0,
      coins_reward: Number(newGoal.coins_reward) || 0,
      gems_reward: Number(newGoal.gems_reward) || 0,
    };

    try {
      await api.post("/goals", payload);

      // API pode retornar created obj ou não — garantir consistência refetch
      await fetchGoals();

      setModalVisible(false);
      setNewGoal({ title: "", description: "", xp_reward: "", coins_reward: "", gems_reward: "" });
      Alert.alert("Sucesso", "Meta criada com sucesso.");
    } catch (err) {
      console.log("Erro ao criar meta:", err);
      Alert.alert("Erro", "Não foi possível criar a meta.");
    }
  };

  // -------------------------
  // open edit modal (prefill)
  // -------------------------
  const openEditModal = (goal) => {
    setEditGoal({
      id: goal.id,
      title: goal.title,
      description: goal.description,
      xp_reward: String(goal.xp_reward ?? ""),
      coins_reward: String(goal.coins_reward ?? ""),
      gems_reward: String(goal.gems_reward ?? ""),
    });
    setEditModalVisible(true);
  };

  // -------------------------
  // update goal (PUT)
  // -------------------------
  const handleUpdateGoal = async () => {
    if (!editGoal.title?.trim()) {
      Alert.alert("Atenção", "Preencha o título da meta.");
      return;
    }

    const payload = {
      title: editGoal.title,
      description: editGoal.description || "",
      xp_reward: Number(editGoal.xp_reward) || 0,
      coins_reward: Number(editGoal.coins_reward) || 0,
      gems_reward: Number(editGoal.gems_reward) || 0,
    };

    try {
      // PUT retorna só message na sua API -> refetch necessário
      await api.put(`/goals/${editGoal.id}`, payload);

      await fetchGoals();
      setEditModalVisible(false);
      Alert.alert("Sucesso", "Meta atualizada com sucesso.");
    } catch (err) {
      console.log("Erro ao atualizar meta:", err);
      Alert.alert("Erro", "Não foi possível atualizar a meta.");
    }
  };

  // -------------------------
  // delete goal (DELETE) com animação
  // -------------------------
  const handleDeleteGoal = async (id) => {
    // animar item (se houver ref)
    const ref = animRefs.current[id];
    try {
      if (ref && ref.fadeOutRight) {
        // se existir o método (Animatable)
        await ref.fadeOutRight(400);
      }
      await api.delete(`/goals/${id}`);
      // garantir sincronização
      await fetchGoals();
      Alert.alert("Sucesso", "Meta removida.");
    } catch (err) {
      console.log("Erro ao remover meta:", err);
      Alert.alert("Erro", "Não foi possível remover a meta.");
    }
  };

  // -------------------------
  // render goal card
  // -------------------------
  const renderGoal = (goal, index) => {
    return (
      <Animatable.View
        ref={(r) => {
          if (r) animRefs.current[goal.id] = r;
        }}
        key={String(goal.id)}
        animation="fadeInUp"
        delay={400 + index * 100}
        duration={600}
        style={ManageGoalsStyles.goalCard}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="target"
              size={26}
              color={Colors.primary}
              style={{ marginRight: 10 }}
            />
            <View>
              <Text style={ManageGoalsStyles.goalTitle}>{goal.title}</Text>
              <Text style={ManageGoalsStyles.goalDate}>
                Recompensas: {goal.coins_reward} moedas · {goal.gems_reward} gemas · {goal.xp_reward} XP
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => openEditModal(goal)} style={{ marginRight: 10 }}>
              <MaterialCommunityIcons name="pencil" size={22} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() =>
              Alert.alert(
                "Confirmar exclusão",
                "Deseja realmente excluir esta meta?",
                [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Excluir", style: "destructive", onPress: () => handleDeleteGoal(goal.id) },
                ]
              )
            }>
              <MaterialCommunityIcons name="trash-can" size={22} color="#ff4d4d" />
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  };

  // -------------------------
  // UI
  // -------------------------
  if (loading) {
    return (
      <View style={[ManageGoalsStyles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={ManageGoalsStyles.container}>
      <ScrollView contentContainerStyle={ManageGoalsStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Animatable.Text animation="fadeInDown" duration={700} style={ManageGoalsStyles.title}>
          Gerenciar Metas
        </Animatable.Text>

        <Animatable.Text animation="fadeInDown" delay={200} duration={700} style={ManageGoalsStyles.caption}>
          Crie novas metas, edite ou remova as existentes.
        </Animatable.Text>

        <Animatable.View animation="bounceIn" delay={300}>
          <TouchableOpacity style={ManageGoalsStyles.addButton} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
            <MaterialCommunityIcons name="plus" size={22} color={Colors.text} />
            <Text style={ManageGoalsStyles.addButtonText}>Nova Meta</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Lista */}
        {goals.length === 0 ? (
          <Animatable.View animation="fadeInUp" delay={400} duration={600} style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={{ color: Colors.textSecondary }}>Nenhuma meta cadastrada.</Text>
          </Animatable.View>
        ) : (
          goals.map((g, i) => renderGoal(g, i))
        )}
      </ScrollView>

      {/* MODAL CRIAR */}
      <Modal transparent animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={ManageGoalsStyles.modalOverlay}>
          <Animatable.View animation="zoomIn" duration={400} style={ManageGoalsStyles.modalContainer}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <Text style={ManageGoalsStyles.modalTitle}>Nova Meta</Text>

              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="Título da meta"
                placeholderTextColor={Colors.textSecondary}
                value={newGoal.title}
                onChangeText={(t) => setNewGoal({ ...newGoal, title: t })}
              />

              <TextInput
                style={[ManageGoalsStyles.input, { height: 80 }]}
                placeholder="Descrição"
                placeholderTextColor={Colors.textSecondary}
                multiline
                value={newGoal.description}
                onChangeText={(t) => setNewGoal({ ...newGoal, description: t })}
              />

              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="XP (ex: 100)"
                placeholderTextColor={Colors.textSecondary}
                keyboardType="numeric"
                value={String(newGoal.xp_reward)}
                onChangeText={(t) => setNewGoal({ ...newGoal, xp_reward: t })}
              />

              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="Recompensa (Moedas)"
                keyboardType="numeric"
                placeholderTextColor={Colors.textSecondary}
                value={String(newGoal.coins_reward)}
                onChangeText={(t) => setNewGoal({ ...newGoal, coins_reward: t })}
              />

              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="Recompensa (Gemas)"
                keyboardType="numeric"
                placeholderTextColor={Colors.textSecondary}
                value={String(newGoal.gems_reward)}
                onChangeText={(t) => setNewGoal({ ...newGoal, gems_reward: t })}
              />

              <View style={ManageGoalsStyles.modalButtons}>
                <Pressable style={ManageGoalsStyles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={ManageGoalsStyles.cancelText}>Cancelar</Text>
                </Pressable>

                <Pressable style={ManageGoalsStyles.saveButton} onPress={handleAddGoal}>
                  <Animatable.Text animation="pulse" iterationCount="infinite" duration={1500} style={ManageGoalsStyles.saveText}>
                    Salvar
                  </Animatable.Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </Animatable.View>
        </View>
      </Modal>

      {/* MODAL EDITAR */}
      <Modal transparent animationType="fade" visible={editModalVisible} onRequestClose={() => setEditModalVisible(false)}>
        <View style={ManageGoalsStyles.modalOverlay}>
          <Animatable.View animation="zoomIn" duration={400} style={ManageGoalsStyles.modalContainer}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <Text style={ManageGoalsStyles.modalTitle}>Editar Meta</Text>

              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="Título"
                placeholderTextColor={Colors.textSecondary}
                value={editGoal.title}
                onChangeText={(t) => setEditGoal({ ...editGoal, title: t })}
              />

              <TextInput
                style={[ManageGoalsStyles.input, { height: 80 }]}
                placeholder="Descrição"
                placeholderTextColor={Colors.textSecondary}
                multiline
                value={editGoal.description}
                onChangeText={(t) => setEditGoal({ ...editGoal, description: t })}
              />

              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="XP (ex: 100)"
                placeholderTextColor={Colors.textSecondary}
                keyboardType="numeric"
                value={String(editGoal.xp_reward)}
                onChangeText={(t) => setEditGoal({ ...editGoal, xp_reward: t })}
              />

              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="Moedas"
                placeholderTextColor={Colors.textSecondary}
                keyboardType="numeric"
                value={String(editGoal.coins_reward)}
                onChangeText={(t) => setEditGoal({ ...editGoal, coins_reward: t })}
              />

              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="Gemas"
                placeholderTextColor={Colors.textSecondary}
                keyboardType="numeric"
                value={String(editGoal.gems_reward)}
                onChangeText={(t) => setEditGoal({ ...editGoal, gems_reward: t })}
              />

              <View style={ManageGoalsStyles.modalButtons}>
                <Pressable style={ManageGoalsStyles.cancelButton} onPress={() => setEditModalVisible(false)}>
                  <Text style={ManageGoalsStyles.cancelText}>Cancelar</Text>
                </Pressable>

                <Pressable style={ManageGoalsStyles.saveButton} onPress={handleUpdateGoal}>
                  <Animatable.Text animation="pulse" iterationCount="infinite" duration={1500} style={ManageGoalsStyles.saveText}>
                    Atualizar
                  </Animatable.Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          </Animatable.View>
        </View>
      </Modal>
    </View>
  );
}
