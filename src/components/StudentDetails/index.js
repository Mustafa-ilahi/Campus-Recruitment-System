import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';
export default function StudentDetails() {
  const [documentName, setDocumentName] = useState('');
  const [documentUri, setDocumentUri] = useState('');
  const [fullName, setFullName] = useState('');
  const [qualification, setQualification] = useState('');
  const [marks, setMarks] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const selectDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setDocumentName(res[0].name);
      setDocumentUri(res[0].uri);
      console.log(res[0]);
      const path = res[0].uri;
      console.log('path', path);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const addDetails = () => {
    setLoader(true);
    if (
      fullName !== '' &&
      qualification !== '' &&
      marks !== '' &&
      documentName !== ''
    ) {
      setError('')
      setLoader(false);
    } else if (fullName == '') {
      setError('Full Name is required');
      setLoader(false);
    } else if (qualification == '') {
      setError('Qualification is required');
      setLoader(false);
    } else if (marks == '') {
      setError('Marks is required');
      setLoader(false);
    } else if (documentName == '') {
      setError('Resume is required');
      setLoader(false);
    }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.createProfile}>Create Profile</Text>
      <View style={styles.form}>
        <TextInput
          label="Full Name"
          activeUnderlineColor="#000"
          onChangeText={text => setFullName(text)}
          //   value={userName}
          //   style={styles.userName}
          underlineColor="transparent"
        />

        <TextInput
          label="Qualification"
          activeUnderlineColor="#000"
          onChangeText={text => setQualification(text)}
          //   value={userName}
          style={styles.qualification}
          underlineColor="transparent"
        />
        <TextInput
          label="Marks"
          activeUnderlineColor="#000"
          onChangeText={text => setMarks(text)}
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
      </View>
      <View style={styles.addDetails}>
        <TouchableOpacity onPress={addDetails}>
          {loader ? (
            <ActivityIndicator animating={true} color={'#fff'} />
          ) : (
            <Text style={styles.addDetailsText}>Add Details</Text>
          )}
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
