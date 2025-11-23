import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import Icon from "@expo/vector-icons/MaterialIcons";

import StoreAdminStyles from "../../styles/admin/AdminStoreScreen";
import { Colors } from "../../styles/Colors";
import api from "../../services/api";
import ItemFormModal from "../../components/admin/ItemFormModal";

export default function AdminStoreScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const listRef = useRef(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/store/items");
      setItems(res.data);
    } catch (err) {
      console.log("Erro ao carregar itens admin:", err);
      Alert.alert("Erro", "Não foi possível carregar os itens.");
    } finally {
      setLoading(false);
    }
  };

  const onOpenCreate = () => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const onOpenEdit = (item) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  const onSaveItem = async (payload) => {
    try {
      setSaving(true);
      if (editingItem) {
        await api.put(`/admin/store/items/${editingItem.ID}`, payload);
        Alert.alert("Sucesso", "Item atualizado.");
      } else {
        await api.post("/admin/store/items", payload);
        Alert.alert("Sucesso", "Item criado.");
      }
      setModalVisible(false);
      await fetchItems();
    } catch (err) {
      console.log("Erro ao salvar item:", err.response?.data || err);
      Alert.alert("Erro", err.response?.data?.message || "Falha ao salvar item.");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (item) => {
    Alert.alert(
      "Deletar item",
      `Deseja realmente deletar "${item.NAME}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () => handleDelete(item.ID),
        },
      ]
    );
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await api.delete(`/admin/store/items/${id}`);
      Alert.alert("Removido", "Item deletado com sucesso.");
      await fetchItems();
    } catch (err) {
      console.log("Erro ao deletar:", err.response?.data || err);
      Alert.alert("Erro", "Não foi possível deletar o item.");
    } finally {
      setDeletingId(null);
    }
  };

  const renderItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      delay={index * 60}
      style={StoreAdminStyles.itemCard}
    >
      <View style={StoreAdminStyles.row}>
        <View style={StoreAdminStyles.itemInfo}>
          {item.IMAGE_URL ? (
            <Image
              source={{ uri: item.IMAGE_URL }}
              style={StoreAdminStyles.thumb}
            />
          ) : (
            <View
              style={[
                StoreAdminStyles.thumb,
                { justifyContent: "center", alignItems: "center" },
              ]}
            >
              <Text style={{ color: Colors.textSecondary }}>No image</Text>
            </View>
          )}

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={StoreAdminStyles.itemName}>{item.NAME}</Text>
            <Text style={StoreAdminStyles.itemDesc} numberOfLines={2}>
              {item.DESCRIPTION || "—"}
            </Text>
            <Text style={StoreAdminStyles.itemMeta}>
              {item.PRICE} Moedas • {item.STOCK} em estoque
            </Text>
          </View>
        </View>

        <View style={StoreAdminStyles.actions}>
          <TouchableOpacity
            style={StoreAdminStyles.iconBtn}
            onPress={() => onOpenEdit(item)}
          >
            <Icon name="edit" size={22} color={Colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={StoreAdminStyles.iconBtn}
            onPress={() => confirmDelete(item)}
          >
            {deletingId === item.ID ? (
              <ActivityIndicator size="small" color={Colors.error} />
            ) : (
              <Icon name="delete" size={22} color={Colors.error} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );

  return (
    <LinearGradient
      colors={[Colors.backgroundDark, Colors.backgroundLight]}
      style={StoreAdminStyles.safeArea}
    >
      <View style={{ flex: 1 }}>
        <View style={StoreAdminStyles.header}>
          <Text style={StoreAdminStyles.title}>Admin — Itens da Loja</Text>

          <TouchableOpacity
            style={StoreAdminStyles.createBtn}
            onPress={onOpenCreate}
          >
            <Text style={StoreAdminStyles.createBtnText}>+ Novo Item</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.primary}
              style={{ marginTop: 40 }}
            />
          ) : (
            <FlatList
              ref={listRef}
              data={items}
              keyExtractor={(i) => i.ID.toString()}
              renderItem={renderItem}
              contentContainerStyle={StoreAdminStyles.list}
            />
          )}
        </View>
      </View>

      <ItemFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={onSaveItem}
        initial={editingItem}
        saving={saving}
      />
    </LinearGradient>
  );
}
