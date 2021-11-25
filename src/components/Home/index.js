import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <View style={{paddingBottom: 30}}>
        <Image
          source={require('../../assets/icon.png')}
          style={{height: 80, width: 80}}
        />
      </View>
      <Text style={styles.campusHeading}>ᴄᴀᴍᴘᴜꜱ ʀᴇᴄʀᴜɪᴛᴍᴇɴᴛ ꜱʏꜱᴛᴇᴍ</Text>

      <View style={{paddingTop: 20}}>

        <View style={styles.btnView}>
          <View style={styles.signupBtn}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpBtnText}> Sign up with Email Id</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.alreadyMember}>
        Already have an account?{' '}
          <Text onPress={() => navigation.navigate('SignIn')} style={styles.signin}>Sign in</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  campusHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A202E',
    textAlign: 'center',
    padding: 5,
  },
  form: {
    paddingTop: 50,
    width: '90%',
  },
  alreadyMember: {
    paddingTop: 20,
    color: '#1A202E',
  },
  btnView: {paddingTop: 20},
  signupBtn: {
    backgroundColor: '#1A202E',
    width: 340,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  signUpBtnText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
  signin: {fontWeight: 'bold',marginTop:20},
});
