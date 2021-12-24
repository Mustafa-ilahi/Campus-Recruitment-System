import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../components/Home';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import CompanyDashboard from '../components/CompanyDashboard';
import StudentDashboard from '../components/StudentDashboard';
import AdminDashboard from '../components/AdminDashboard';
import StudentDetails from '../components/StudentDetails';
import DrawerContent from '../components/DrawerContent';
import StudentProfile from '../components/StudentProfile'
import PDFViewer from '../components/PDFViewer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  const isSignedIn = useSelector(state => state.email);
  const selectedRole = useSelector(state => state.role);
  console.log('==', isSignedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isSignedIn ? (
          selectedRole === 'Admin' ? (
            <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
          ) : selectedRole === 'Student' ? (
            <>
              <Stack.Screen name="StudentDrawer" component={StudentDrawer} />
              <Stack.Screen name="PDFViewer" component={PDFViewer} />

            </>
          ) : (
            <Stack.Screen name="CompanyDrawer" component={CompanyDrawer} />
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

function AdminDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
      <Drawer.Screen name="Admin Dashboard" component={AdminDashboard} />
    </Drawer.Navigator>
  );
}

function StudentDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
      <Drawer.Screen name="Student Dashboard" component={StudentDashboard} />
      <Drawer.Screen name="Create Profile" component={StudentDetails} />
      <Drawer.Screen name="Student Profile" component={StudentProfile} />

    </Drawer.Navigator>
  );
}
function CompanyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
      <Drawer.Screen name="Company Dashboard" component={CompanyDashboard} />
    </Drawer.Navigator>
  );
}
