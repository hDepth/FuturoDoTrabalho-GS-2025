import React from 'react';
import { View, Image, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function FloatingCard({ visible, item }) {
  if (!visible) return null;

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={900}
      style={{
        position:'absolute',
        bottom:100,
        alignSelf:'center',
        backgroundColor:'#fff',
        padding:15,
        borderRadius:15,
        elevation:5,
        alignItems:'center',
        zIndex:998
      }}
    >
      <Image
        source={{ uri: item.image_url }}
        style={{ width:70, height:70, marginBottom:10 }}
      />
      <Text style={{ fontWeight:'bold' }}>{item.name}</Text>
    </Animatable.View>
  );
}
