import React, {useEffect, useState} from 'react';
import {View, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title, Text, Switch, Drawer, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {removeData} from '../../store/action';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

export default function DrawerContent(props) {
  const dispatch = useDispatch();
  const selectedRole = useSelector(state => state.role);
  const signOut = () => {
    dispatch(removeData());
    setTimeout(() => {
      props.navigation.navigate('Auth');
    }, 2000);
  };

  const DrawerScreenDecider = () => {
    if (selectedRole === 'Student') {
      props.navigation.navigate('Student Dashboard');
    } else if (selectedRole === 'Admin') {
      props.navigation.navigate('Admin Dashboard');
    } else if (selectedRole === 'Company') {
      props.navigation.navigate('Company Dashboard');
    }
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{flex: 1}}>
          <StatusBar animated="auto" />
          <Drawer.Section style={{marginTop: 15}}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Dashboard"
              onPress={DrawerScreenDecider}
            />
            {selectedRole === 'Student' && (
              <DrawerItem
                icon={({color, size}) => (
                  <Icon2 name="pencil-square-o" color={color} size={size} />
                )}
                label="Create Profile"
                onPress={() => {
                  props.navigation.navigate('Create Profile');
                }}
              />
            )}

            <DrawerItem
              icon={({color, size}) => (
                <Icon name="logout" color={color} size={size} />
              )}
              label="Sign Out"
              onPress={signOut}
            />
            {/* <View style={styles.signOut}>
              <TouchableOpacity>
                <Text style={styles.signOutText}>Sign out</Text>
              </TouchableOpacity>
            </View> */}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  signOut: {
    backgroundColor: '#1A202E',
    width: 120,
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    // marginLeft: 10,
  },
  signOutText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
});
