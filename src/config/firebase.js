import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/auth';
// import '@react-native-firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyCCZH5e-n7s19CMdl-z9XVCpQE5YLBjtGc',
  authDomain: 'campus-recruitment-syste-69eb1.firebaseapp.com',
  projectId: 'campus-recruitment-syste-69eb1',
  storageBucket: 'campus-recruitment-syste-69eb1.appspot.com',
  messagingSenderId: '11038948812',
  appId: '1:11038948812:web:4e2a11d43e171f00463169',
  measurementId: 'G-495N7LYPEC',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// const storage = firebase.storage();

export default () => {
  return {firebase, auth};
};
