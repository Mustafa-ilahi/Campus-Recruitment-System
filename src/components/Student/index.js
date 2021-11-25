import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity} from 'react-native';
import {Button, Menu, Divider, Provider} from 'react-native-paper';

export default function Student() {
  const [visible, setVisible] = useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <Provider>
      <View style={styles.container}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<TouchableOpacity onPress={openMenu}><Text>Select Role</Text></TouchableOpacity>}>
            <Menu.Item onPress={() => {}} title="Admin" />
            <Menu.Item onPress={() => {}} title="Student" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Company" />
          </Menu>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    paddingTop: 300,
  },
});
