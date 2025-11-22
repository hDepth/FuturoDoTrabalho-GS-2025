import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Confetti({ visible }) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/lottie/confetti.json')}
        autoPlay
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
