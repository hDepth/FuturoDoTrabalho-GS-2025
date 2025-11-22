import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function PurchaseSuccessModal({ visible, onClose }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent:'center',
        alignItems:'center'
      }}>
        <Animatable.View
          animation="zoomIn"
          duration={600}
          style={{
            width:'80%',
            backgroundColor:'#fff',
            padding:20,
            borderRadius:20,
            alignItems:'center'
          }}
        >
          <Text style={{ fontSize:20, fontWeight:'bold', marginBottom:10 }}>
            🎉 Compra Realizada!
          </Text>
          <Text style={{ fontSize:16, textAlign:'center', marginBottom:20 }}>
            Seu item foi adicionado ao inventário.
          </Text>

          <TouchableOpacity onPress={onClose}
            style={{
              paddingVertical:10,
              paddingHorizontal:25,
              backgroundColor:'#000',
              borderRadius:10
            }}>
            <Text style={{ color:'#fff', fontWeight:'bold' }}>Continuar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </Modal>
  );
}
