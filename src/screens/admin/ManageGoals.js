import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../styles/Colors";
import ManageGoalsStyles from "../../styles/admin/ManageGoals";

export default function ManageGoals() {
  const [goals, setGoals] = useState([
    { id: 1, title: "Finalizar módulo React Native", deadline: "15/11/2025" },
    { id: 2, title: "Publicar documentação do projeto", deadline: "22/11/2025" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    deadline: "",
    rewardCoins: "",
    rewardGems: "",
  });

  const handleAddGoal = () => {
    if (!newGoal.title.trim()) return;
    setGoals([...goals, { ...newGoal, id: Date.now() }]);
    setNewGoal({
      title: "",
      description: "",
      deadline: "",
      rewardCoins: "",
      rewardGems: "",
    });
    setModalVisible(false);
  };

  return (
    <View style={ManageGoalsStyles.container}>
      <ScrollView
        contentContainerStyle={ManageGoalsStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.Text
          animation="fadeInDown"
          duration={700}
          style={ManageGoalsStyles.title}
        >
          Gerenciar Metas
        </Animatable.Text>

        <Animatable.Text
          animation="fadeInDown"
          delay={200}
          duration={700}
          style={ManageGoalsStyles.caption}
        >
          Crie novas metas, edite ou remova as existentes.
        </Animatable.Text>

        {/* Botão Nova Meta */}
        <Animatable.View animation="bounceIn" delay={300}>
          <TouchableOpacity
            style={ManageGoalsStyles.addButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="plus" size={22} color={Colors.text} />
            <Text style={ManageGoalsStyles.addButtonText}>Nova Meta</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Lista de Metas */}
        {goals.map((goal, index) => (
          <Animatable.View
            key={goal.id}
            animation="fadeInUp"
            delay={400 + index * 150}
            duration={600}
            style={ManageGoalsStyles.goalCard}
          >
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
                  Prazo: {goal.deadline}
                </Text>
              </View>
            </View>
          </Animatable.View>
        ))}
      </ScrollView>

      {/* MODAL DE CRIAÇÃO DE META */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={ManageGoalsStyles.modalOverlay}>
          <Animatable.View
            animation="zoomIn"
            duration={400}
            style={ManageGoalsStyles.modalContainer}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Text style={ManageGoalsStyles.modalTitle}>Nova Meta</Text>

              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="Título da meta"
                placeholderTextColor={Colors.textSecondary}
                value={newGoal.title}
                onChangeText={(text) =>
                  setNewGoal({ ...newGoal, title: text })
                }
              />
              <TextInput
                style={[ManageGoalsStyles.input, { height: 80 }]}
                placeholder="Descrição"
                placeholderTextColor={Colors.textSecondary}
                multiline
                value={newGoal.description}
                onChangeText={(text) =>
                  setNewGoal({ ...newGoal, description: text })
                }
              />
              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="Prazo (ex: 15/11/2025)"
                placeholderTextColor={Colors.textSecondary}
                value={newGoal.deadline}
                onChangeText={(text) =>
                  setNewGoal({ ...newGoal, deadline: text })
                }
              />
              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="Recompensa (Moedas)"
                keyboardType="numeric"
                placeholderTextColor={Colors.textSecondary}
                value={newGoal.rewardCoins}
                onChangeText={(text) =>
                  setNewGoal({ ...newGoal, rewardCoins: text })
                }
              />
              <TextInput
                style={ManageGoalsStyles.input}
                placeholder="Recompensa (Gemas)"
                keyboardType="numeric"
                placeholderTextColor={Colors.textSecondary}
                value={newGoal.rewardGems}
                onChangeText={(text) =>
                  setNewGoal({ ...newGoal, rewardGems: text })
                }
              />

              {/* Botões */}
              <View style={ManageGoalsStyles.modalButtons}>
                <Pressable
                  style={ManageGoalsStyles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={ManageGoalsStyles.cancelText}>Cancelar</Text>
                </Pressable>
                <Pressable
                  style={ManageGoalsStyles.saveButton}
                  onPress={handleAddGoal}
                >
                  <Animatable.Text
                    animation="pulse"
                    iterationCount="infinite"
                    duration={1500}
                    style={ManageGoalsStyles.saveText}
                  >
                    Salvar
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
