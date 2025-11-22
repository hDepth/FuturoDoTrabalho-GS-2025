import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Colors } from "../../styles/Colors";

export default function ItemFormModal({ visible, onClose, onSave, initial, saving }) {
  // initial may be null or existing item (with fields NAME, DESCRIPTION, PRICE, STOCK, IMAGE_URL)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (initial) {
      setName(initial.NAME || "");
      setDescription(initial.DESCRIPTION || "");
      setPrice(String(initial.PRICE ?? ""));
      setStock(String(initial.STOCK ?? ""));
      setImageUrl(initial.IMAGE_URL || "");
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImageUrl("");
    }
  }, [initial, visible]);

  const submit = () => {
    // basic client validation
    if (!name.trim()) return alert("Nome é obrigatório");
    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      imageUrl: imageUrl || null,
    };
    onSave(payload);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{
        flex:1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        paddingHorizontal: 20,
      }}>
        <Animatable.View animation="zoomIn" duration={300} style={{
          backgroundColor: Colors.backgroundLight,
          borderRadius: 12,
          padding: 18,
        }}>
          <ScrollView>
            <Text style={{ color: Colors.text, fontWeight: "700", fontSize: 18, marginBottom: 10 }}>
              {initial ? "Editar Item" : "Novo Item"}
            </Text>

            <Text style={{ color: Colors.textSecondary, marginBottom: 6 }}>Nome</Text>
            <TextInput value={name} onChangeText={setName}
              placeholder="Nome do item"
              placeholderTextColor={Colors.textSecondary}
              style={{ backgroundColor: Colors.backgroundDark, padding: 10, borderRadius: 8, color: Colors.text }}
            />

            <Text style={{ color: Colors.textSecondary, marginTop: 10 }}>Descrição</Text>
            <TextInput value={description} onChangeText={setDescription}
              placeholder="Descrição"
              placeholderTextColor={Colors.textSecondary}
              style={{ backgroundColor: Colors.backgroundDark, padding: 10, borderRadius: 8, color: Colors.text, minHeight: 80 }}
              multiline
            />

            <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: Colors.textSecondary }}>Preço (coins)</Text>
                <TextInput keyboardType="numeric" value={price} onChangeText={setPrice}
                  placeholder="0"
                  placeholderTextColor={Colors.textSecondary}
                  style={{ backgroundColor: Colors.backgroundDark, padding: 10, borderRadius: 8, color: Colors.text }}
                />
              </View>

              <View style={{ width: 110 }}>
                <Text style={{ color: Colors.textSecondary }}>Estoque</Text>
                <TextInput keyboardType="numeric" value={stock} onChangeText={setStock}
                  placeholder="0"
                  placeholderTextColor={Colors.textSecondary}
                  style={{ backgroundColor: Colors.backgroundDark, padding: 10, borderRadius: 8, color: Colors.text }}
                />
              </View>
            </View>

            <Text style={{ color: Colors.textSecondary, marginTop: 10 }}>URL da Imagem</Text>
            <TextInput value={imageUrl} onChangeText={setImageUrl}
              placeholder="https://..."
              placeholderTextColor={Colors.textSecondary}
              style={{ backgroundColor: Colors.backgroundDark, padding: 10, borderRadius: 8, color: Colors.text }}
            />

            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 16 }}>
              <TouchableOpacity onPress={onClose} style={{ padding: 10, marginRight: 8 }}>
                <Text style={{ color: Colors.textSecondary }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={submit} style={{ backgroundColor: Colors.primary, padding: 10, borderRadius: 8, minWidth: 110, alignItems:'center' }}>
                {saving ? <ActivityIndicator color="#fff" /> : <Text style={{ color: "#fff", fontWeight: "700" }}>{initial ? "Salvar" : "Criar"}</Text>}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    </Modal>
  );
}
