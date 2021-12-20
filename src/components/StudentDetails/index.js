import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Button, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import FilePickerManager from 'react-native-file-picker';
import {useSelector} from 'react-redux';

export default function StudentDetails({navigation}) {
  const [documentName, setDocumentName] = useState('');
  const [documentUri, setDocumentUri] = useState('');
  const [fullName, setFullName] = useState('');
  const [qualification, setQualification] = useState('');
  const [marks, setMarks] = useState('');
  const [loader, setLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [selectedDocument, setSelectedDocument] = useState('');
  const isSignedIn = useSelector(state => state.email);

  const selectDocument = async () => {
    FilePickerManager.showFilePicker(null, async response => {
      console.log('Response = ', response);
      setDocumentName(response.fileName);
      setDocumentUri(response.uri);

      const result = await RNFetchBlob.fs.readFile(response.uri, 'base64');
      uploadFileToFirebaseStorage(result, response);
      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
    });
  };

  const uploadFileToFirebaseStorage = async (result, response) => {
    const uploadTask = storage()
      .ref(`resumes/${response.fileName}`)
      .putString(result, 'base64', {contentType: response.type});

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log('Upload is ' + progress + '% done');
        if (progress !== 100) {
          setUploadLoader(true);
        } else {
          setUploadLoader(false);
        }
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      error => {
        console.log(error);
      },
      () => {
        setSelectedDocument(response);
        let uri = storage()
          .ref(`resumes/${response.fileName}`)
          .getDownloadURL()
          .then(res => setDownloadUrl(res));
      },
    );
  };

  const addDetails = () => {
    setLoader(true);
    if (
      fullName !== '' &&
      qualification !== '' &&
      marks !== '' &&
      documentName !== ''
    ) {
      setError('');
      setLoader(false);

      if (downloadUrl !== '' && selectedDocument !== '') {
        firestore()
          .collection('StudentDetails')
          .add({
            name: fullName,
            qualification: qualification,
            marks: marks,
            email: isSignedIn,
            fileName: selectedDocument.fileName,
            fileType: selectedDocument.type,
            fileURL: downloadUrl,
          })
          .then(() => {
            navigation.navigate('Student Dashboard');
          });
      }
    } else if (fullName == '') {
      setError('Name is required');
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
          value={fullName}
          underlineColor="transparent"
        />

        <TextInput
          label="Qualification"
          activeUnderlineColor="#000"
          onChangeText={text => setQualification(text)}
          value={qualification}
          style={styles.qualification}
          underlineColor="transparent"
        />
        <TextInput
          label="Marks"
          keyboardType="numeric"
          activeUnderlineColor="#000"
          onChangeText={text => setMarks(text)}
          value={marks}
          underlineColor="transparent"
        />
        <View style={styles.fileName}>
          {documentName !== '' && <Text>{documentName}</Text>}
        </View>
        <View style={styles.uploadResumeView}>
          <TouchableOpacity color="#000000" onPress={selectDocument}>
            {uploadLoader ? (
              <ActivityIndicator animating={true} color={'#000'} />
            ) : (
              <Text style={styles.uploadText}> Upload Resume</Text>
            )}
          </TouchableOpacity>
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
  uploadResumeView: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: 330,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    // marginTop: 20,
  },
  uploadText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    textTransform: 'uppercase',
  },
  fileName: {
    paddingTop: 10,
  },
});
