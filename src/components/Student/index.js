import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity} from 'react-native';

export default function Student() {
 
  return (
      <View style={styles.container}>
        <Text>Student Here</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
