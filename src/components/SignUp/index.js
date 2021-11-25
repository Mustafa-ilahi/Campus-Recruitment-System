import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Menu,
  Provider,
  ActivityIndicator,
  Colors,
  TextInput,
} from 'react-native-paper';

import firebase from '../../config/firebase';
import firestore from '@react-native-firebase/firestore';
export default function SignUp({navigation}) {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(true);
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [visible, setVisible] = useState(false);
  const [role, setRole] = useState('');
  const [loader, setLoader] = useState(false);
  const {auth} = firebase();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const showPasswordValue = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      setEyeIcon('eye');
    } else {
      setEyeIcon('eye-off');
    }
  };

  const createAnAccount = async () => {
    try {
      setLoader(true);
      const signUp = await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore()
            .collection('Users')
            .add({
              userName,
              email,
              role,
            })
            .then(() => {
              setLoader(false);
              // navigation.navigate("Home")
            });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.signUpView}>
        <Text style={styles.welcomeBack}>Sign up!</Text>
        <Text style={styles.signUpText}>Create an account</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          label="Username"
          activeUnderlineColor="#000"
          onChangeText={text => setUserName(text)}
          value={userName}
          style={styles.userName}
          underlineColor="transparent"
        />
        <TextInput
          label="Email"
          activeUnderlineColor="#000"
          onChangeText={text => setEmail(text)}
          value={email}
          style={styles.email}
          underlineColor="transparent"
        />
        <TextInput
          onChangeText={text => setPassword(text)}
          value={password}
          activeUnderlineColor="#000"
          label="Password"
          secureTextEntry={showPassword}
          right={<TextInput.Icon name={eyeIcon} onPress={showPasswordValue} />}
          style={styles.password}
          underlineColor="transparent"
        />
        <Provider>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Menu
              style={{position: 'absolute', top: 250, left: 120}}
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  {role !== '' ? (
                    <Text style={styles.role}>Role: {role}</Text>
                  ) : (
                    <Text style={styles.role}> Select Role</Text>
                  )}
                </TouchableOpacity>
              }>
              <Menu.Item
                onPress={() => {
                  setRole('Admin'), setVisible(false);
                }}
                title="Admin"
              />
              <Menu.Item
                onPress={() => {
                  setRole('Student'), setVisible(false);
                }}
                title="Student"
              />
              <Menu.Item
                onPress={() => {
                  setRole('Company'), setVisible(false);
                }}
                title="Company"
              />
            </Menu>
          </View>
        </Provider>
      </View>

      <View style={{paddingTop: visible ? 200 : 50}}>
        <View style={styles.createAccountBtn}>
          <TouchableOpacity onPress={createAnAccount}>
            {loader ? (
              <ActivityIndicator animating={true} color={'#fff'} />
            ) : (
              <Text style={styles.createAccountBtnText}>Create an account</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={styles.alreadyMember}>
          Already have an account?{' '}
          <Text
            onPress={() => navigation.navigate('SignIn')}
            style={styles.signin}>
            Sign in
          </Text>
        </Text>
      </View>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          By signing up, you're agree to our{' '}
          <Text style={styles.footerBold}>Terms of Use</Text> and{' '}
          <Text style={styles.footerBold}>Privacy & Policy.</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  signUpView: {alignSelf: 'flex-start', padding: 10},
  welcomeBack: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1A202E',
    paddingLeft: 7,
  },
  form: {
    width: '95%',
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },
  signUpText: {
    color: '#728195',
    paddingTop: 10,
    fontSize: 18,
    paddingLeft: 7,
  },
  userName: {
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  email: {
    marginTop: 20,
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  passwordText: {
    paddingTop: 20,
  },
  password: {
    marginTop: 20,
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },

  createAccountBtn: {
    backgroundColor: '#1A202E',
    width: 340,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  createAccountBtnText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
  footerView: {paddingTop: 30, width: 270},
  footerText: {fontSize: 16, color: '#728195'},
  footerBold: {fontWeight: 'bold', color: '#000'},
  alreadyMember: {
    paddingTop: 20,
    color: '#1A202E',
  },
  signin: {fontWeight: 'bold'},
  role: {
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    color: '#1A202E',
  },
});
