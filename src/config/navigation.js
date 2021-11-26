import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Home from '../components/Home';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import Student from '../components/Student';
import Admin from '../components/Admin';
import Company from '../components/Company';
import Dashboard from '../components/Dashboard';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const isSignedIn = useSelector(state => state.email);
  const selectedRole = useSelector(state => state.role);
  console.log('==', isSignedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isSignedIn ? (
          // <Stack.Screen name="Dashboard" component={Dashboard} />
          // {
          selectedRole === 'Admin' ? (
            <Stack.Screen name="Admin" component={Admin} />
          ) : // }
          selectedRole === 'Student' ? (
            <Stack.Screen name="Student" component={Student} />
          ) : (
            <Stack.Screen name="Company" component={Company} />
          )
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
