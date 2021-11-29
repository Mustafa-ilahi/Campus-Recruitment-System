import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {storage} from '../../config/firebase';
import firestore from '@react-native-firebase/firestore';
import RNFetchBlob from 'rn-fetch-blob';
export default function StudentDetails() {
  const [documentName, setDocumentName] = useState('');
  const [documentUri, setDocumentUri] = useState('');
  const selectDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setDocumentName(res[0].name);
      setDocumentUri(res[0].uri);
      console.log(res[0]);
      //   const storageRef = storage.ref(`resumes/${res[0].name}`);
      //   await storageRef.put(res[0]);
      //   const url = await storageRef.getDownloadURL();
      //   console.log(url);
      const path = res[0].uri;
      console.log("path",path);
      const result =  await RNFetchBlob.fs.readFile(path, 'base64');
      console.log(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.createProfile}>Create Profile</Text>
      <View style={styles.form}>
        <TextInput
          label="Full Name"
          activeUnderlineColor="#000"
          //   onChangeText={text => setUserName(text)}
          //   value={userName}
          //   style={styles.userName}
          underlineColor="transparent"
        />

        <TextInput
          label="Qualification"
          activeUnderlineColor="#000"
          //   onChangeText={text => setUserName(text)}
          //   value={userName}
          style={styles.qualification}
          underlineColor="transparent"
        />
        <TextInput
          label="Marks"
          activeUnderlineColor="#000"
          //   onChangeText={text => setUserName(text)}
          //   value={userName}
          //   style={styles.userName}
          underlineColor="transparent"
        />
        <View style={styles.uploadResumeView}>
          {/* <TouchableOpacity style={{border:2}}>
            <Text style={styles.uploadResume}>Upload Resume</Text>
          </TouchableOpacity> */}
          {documentName !== '' && <Text>{documentName}</Text>}

          <Button mode="outlined" color="#1A202E" onPress={selectDocument}>
            Upload Resume
          </Button>
        </View>
      </View>
      <View style={styles.addDetails}>
        <TouchableOpacity>
          {/* {loader ? (
              <ActivityIndicator animating={true} color={'#fff'} />
            ) : ( */}
          <Text style={styles.addDetailsText}>Add Details</Text>
          {/* )
            } */}
        </TouchableOpacity>
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
  createProfile: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202E',
  },
  form: {
    paddingTop: 10,
    width: '95%',
    alignSelf: 'flex-start',
    paddingLeft: 15,
  },

  qualification: {
    marginBottom: 20,
    marginTop: 20,
  },
  addDetails: {
    backgroundColor: '#1A202E',
    width: 340,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  addDetailsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
  uploadResume: {
    fontSize: 16,
    color: '#1A202E',
    marginTop: 10,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  uploadResumeView: {marginTop: 10},
});
