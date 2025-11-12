import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import ChatStyles from '../../styles/user/ChatScreen';  
import { Colors } from '../../styles/Colors'; // Importar para o placeholder
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá! Sou seu assistente de produtividade. Como posso ajudar?', sender: 'ia' },
    // ... mais mensagens
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = { id: String(messages.length + 1), text: inputText, sender: 'user' };
    
    // Adiciona a mensagem do usuário e prepara a resposta da IA
    setMessages(prev => [newMessage, ...prev]);
    setInputText('');
    
    // Simula a resposta da IA após um tempo
    setTimeout(() => {
      const iaResponse = { id: String(messages.length + 2), text: 'Entendido! Estou analisando seu pedido...', sender: 'ia' };
      setMessages(prev => [iaResponse, ...prev]);
    }, 1000);
  };

  const renderMessage = ({ item }) => (
    <View style={[
      ChatStyles.messageBubble,
      item.sender === 'user' ? ChatStyles.userBubble : ChatStyles.iaBubble
    ]}>
      <Text style={ChatStyles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={ChatStyles.safeArea}>
      <View style={ChatStyles.container}>
        {/* Header do Chat */}
        <View style={ChatStyles.header}>
          <Text style={ChatStyles.title}>Assistente IA</Text>
          <Text style={ChatStyles.subtitle}>Chat de Produtividade</Text>
        </View>

        {/* Lista de Mensagens */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          inverted // Começa de baixo para cima
          style={ChatStyles.messageList}
        />

        {/* Input de Mensagem */}
        <View style={ChatStyles.inputContainer}>
          <TextInput
            style={ChatStyles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite sua dúvida..."
            placeholderTextColor={Colors.textSecondary}
          />
          <TouchableOpacity style={ChatStyles.sendButton} onPress={handleSend}>
            <MaterialCommunityIcons name="send" size={24} color={Colors.text} />
            <Text style={ChatStyles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}