import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

export default function StudentDashboard({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.studentText}>Student Dashboard </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  studentText:{
    fontSize:18,
    color: '#1A202E',

  },
});
