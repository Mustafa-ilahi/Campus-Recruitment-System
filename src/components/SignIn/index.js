import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import firebase from '../../config/firebase';
import firestore from '@react-native-firebase/firestore';
import {storeData} from '../../store/action';
import {useDispatch} from 'react-redux';
export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [eyeIcon, setEyeIcon] = useState('eye-off');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const {auth} = firebase();
  const dispatch = useDispatch();

  const showPasswordValue = () => {
    setShowPassword(!showPassword);
    if (showPassword) {
      setEyeIcon('eye');
    } else {
      setEyeIcon('eye-off');
    }
  };

  const signIn = () => {
    setLoader(true);
    try {
      if (email !== '' && password !== '') {
        const signIn = auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setLoader(false);
            let data = firestore()
              .collection('Users')
              .where('email', '==', email)
              .get()
              .then(snapshot => {
                snapshot.forEach(item => {
                  dispatch(storeData(item.data().role, item.data().email));
                });
              });
          })
          .catch(error => {
            setError(error.message.split(']')[1]);
            setLoader(false);
          });
      } else if (email == '') {
        setError('Email is required');
        setLoader(false);
      } else if (password == '') {
        setError('Password is required');
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeBackView}>
        <Text style={styles.welcomeBack}>Welcome Back!</Text>
        <Text style={styles.siginText}>Sign in to your account</Text>
      </View>
      <View style={styles.form}>
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
        <View style={{marginTop: 10}}>
          {error !== '' && (
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                textAlign: 'left',
                paddingLeft: 5,
              }}>
              {error}
            </Text>
          )}
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnView}>
        <View style={styles.button}>
          <TouchableOpacity onPress={signIn}>
            {loader ? (
              <ActivityIndicator animating={true} color={'#fff'} />
            ) : (
              <Text style={styles.btnText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.signUpView}>
        <Text style={styles.signUpText}>
          Don't have an account?
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={styles.signup}>
            {' '}
            Sign Up
          </Text>
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
  welcomeBackView: {alignSelf: 'flex-start', padding: 10},
  welcomeBack: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1A202E',
    paddingLeft: 7,
  },
  form: {
    paddingTop: 20,
    width: '95%',
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },
  siginText: {
    color: '#728195',
    paddingTop: 10,
    fontSize: 18,
    paddingLeft: 7,
  },
  email: {
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  password: {
    marginTop: 20,
    borderTopRadius: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingTop: 10,
  },
  btnView: {paddingTop: 20},
  button: {
    backgroundColor: '#1A202E',
    width: 340,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
  signUpView: {paddingTop: 50},
  signUpText: {fontSize: 14, color: '#1A202E'},
  signup: {fontWeight: 'bold'},
});
