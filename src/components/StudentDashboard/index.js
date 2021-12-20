import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Divider, Drawer, List} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/Foundation';

export default function StudentDashboard({navigation}) {
  const [studentDetails, setStudentDetails] = useState('');
  const isSignedIn = useSelector(state => state.email);
  console.log(isSignedIn);
  useEffect(() => {
    firestore()
      .collection('StudentDetails')
      .where('email', '==', isSignedIn)
      .get()
      .then(snapshot => {
        setStudentDetails(snapshot.docs[0]._data);
      });
  }, []);

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader style={{alignSelf: 'center'}}>
          <List.Item
            title="Student Details"
            left={() => (
              <List.Icon
                color="#000"
                icon={({color, size}) => (
                  <Icon
                    name="card-account-details-star"
                    color={color}
                    size={size}
                  />
                )}
              />
            )}
          />
        </List.Subheader>
        <Divider />
        <List.Item
          title={studentDetails.name}
          left={() => <List.Icon color="#000"  icon={({color, size}) => (
            <Icon2 name="user-circle-o" color={color} size={size} />
          )} />}
        />
        <List.Item
          title={studentDetails.qualification}
          left={() => <List.Icon color="#000"  icon={({color, size}) => (
            <Icon3 name="graduation-cap" color={color} size={size} />
          )} />}
        />
        <List.Item
          title={`Marks: ${studentDetails.marks}`}
          left={() => <List.Icon color="#000"  icon={({color, size}) => (
            <Icon name="clipboard-text" color={color} size={size} />
          )} />}
        />
        <TouchableOpacity>
          <List.Item
            title={studentDetails.fileName}
            left={() => (
              <List.Icon
                icon={({color, size}) => (
                  <Icon name="file-pdf" color={color} size={size} />
                )}
              />
            )}
          />
        </TouchableOpacity>
        
      </List.Section>
      {/* <Text style={styles.studentText}>Name: {studentDetails.name}</Text>
      <Text style={styles.studentText}>
        Qualification: {studentDetails.qualification}
      </Text>
      <Text style={styles.studentText}>Marks: {studentDetails.marks}</Text>
      <View style={{display: 'flex'}}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/pdf.png')}
            style={{height: 80, width: 80}}
          />
          <Text style={styles.studentText}> {studentDetails.fileName}</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  studentText: {
    fontSize: 18,
    color: '#1A202E',
  },
});
