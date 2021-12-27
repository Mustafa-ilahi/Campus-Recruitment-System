import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export default function JobPost({navigation}) {
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [hiringNum, setHiringNum] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');

  const addDetails = () => {
    setLoader(true);
    if (
      jobTitle !== '' &&
      jobDescription !== '' &&
      hiringNum !== '' &&
      companyName !== '' && companyEmail !==''
    ) {
      setError('');
      setLoader(false);
      firestore()
        .collection('CompanyDetails')
        .add({
          companyName: companyName,
          companyEmail:companyEmail,
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          hiringNum: hiringNum,
        })
        .then(() => {
          navigation.navigate('Company Dashboard');
          setCompanyName('')
          setJobTitle('')
          setJobDescription('')
          setHiringNum('')
        });
    } else if (companyName == '') {
      setError('Company name is required');
      setLoader(false);
    }else if (companyEmail == '') {
      setError('Company email is required');
      setLoader(false);
    } else if (jobTitle == '') {
      setError('Job Title is required');
      setLoader(false);
    } else if (jobDescription == '') {
      setError('Job Description is required');
      setLoader(false);
    } else if (hiringNum == '') {
      setError('No of hiring is required');
      setLoader(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.vacancyDetails}>Job Details</Text>
      <TextInput
        label="Company Name"
        activeUnderlineColor="#000"
        onChangeText={text => setCompanyName(text)}
        value={companyName}
        underlineColor="transparent"
        style={{margin: 10}}
      />
        <TextInput
        label="Company Email"
        activeUnderlineColor="#000"
        onChangeText={text => setCompanyEmail(text)}
        value={companyEmail}
        underlineColor="transparent"
        style={{margin: 10}}
      />
      <TextInput
        label="Job title"
        activeUnderlineColor="#000"
        onChangeText={text => setJobTitle(text)}
        value={jobTitle}
        underlineColor="transparent"
        style={{margin: 10}}
      />
      <TextInput
        label="Job Description"
        activeUnderlineColor="#000"
        onChangeText={text => setJobDescription(text)}
        value={jobDescription}
        underlineColor="transparent"
        style={{margin: 10}}
      />
      <TextInput
        label="No. of hiring"
        activeUnderlineColor="#000"
        keyboardType="numeric"
        onChangeText={text => setHiringNum(text)}
        value={hiringNum}
        underlineColor="transparent"
        style={{margin: 10}}
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
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    // padding:10
  },
  vacancyDetails: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202E',
    textAlign: 'center',
    padding: 10,
  },

  addDetails: {
    backgroundColor: '#1A202E',
    width: 340,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  addDetailsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
  },
});
