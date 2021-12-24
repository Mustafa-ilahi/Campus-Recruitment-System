import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {Modal, Portal, Provider} from 'react-native-paper';

import {Divider, Drawer, List} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
// import RNFetchBlob from 'rn-fetch-blob';

export default function StudentProfile({navigation}) {
  const [studentDetails, setStudentDetails] = useState('');
  const [visible, setVisible] = React.useState(false);

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

  const pdfViewer = () => {
    navigation.navigate('PDFViewer', {fileData: studentDetails.fileURL});
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 30};


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
          left={() => (
            <List.Icon
              color="#000"
              icon={({color, size}) => (
                <Icon2 name="user-circle-o" color={color} size={size} />
              )}
            />
          )}
        />
        <List.Item
          title={studentDetails.qualification}
          left={() => (
            <List.Icon
              color="#000"
              icon={({color, size}) => (
                <Icon3 name="graduation-cap" color={color} size={size} />
              )}
            />
          )}
        />
        <List.Item
          title={`Marks: ${studentDetails.marks}`}
          left={() => (
            <List.Icon
              color="#000"
              icon={({color, size}) => (
                <Icon name="clipboard-text" color={color} size={size} />
              )}
            />
          )}
        />
        <TouchableOpacity onPress={showModal}>
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
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={pdfViewer}>
              <Text style={styles.viewResume}>View Resume</Text>
            </TouchableOpacity>
            <Divider style={{marginTop: 20}} />
            <TouchableOpacity >
              <Text style={styles.downloadResume}>Download Resume</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
}
// onPress={checkPermission}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  studentText: {
    fontSize: 18,
    color: '#1A202E',
  },
  viewResume: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  downloadResume: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingTop: 15,
    padding: 10,
  },
});

