import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SignIn from './src/components/SignIn';
import SignUp from './src/components/SignUp';
import Admin from './src/components/Admin';
import Student from './src/components/Student';
import Company from './src/components/Company';
import Home from './src/components/Home';
import MainNavigator from './src/config/navigation';
export default function App() {
  return (
    <View style={styles.container}>
      <MainNavigator />
      {/* <Home /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* <Admin /> */}
      {/* <Student /> */}
      {/* <Company /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"#000"
  },
});
