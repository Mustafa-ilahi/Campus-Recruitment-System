import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {View, Text, Button} from 'react-native';
import {Divider, Drawer, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
export default function CompanyDashboard({navigation}) {
  const [studentRecord, setStudentRecord] = useState([]);
  const role = useSelector(state => state.role);

  useEffect(() => {
    let tempData = [];
    firestore()
      .collection('StudentDetails')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(item => {
          tempData.push(item.data());
        });
        setStudentRecord(tempData);
      });
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        // height: '100%',
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 10,
      }}>
      <Divider style={{borderWidth: 1, borderColor: '#cacaca'}} />
      <List.Section>
        <List.Subheader style={{alignSelf: 'center', padding: 0}}>
          <List.Item
            title="Student Details"
            titleStyle={{fontSize: 20}}
            left={() => (
              <List.Icon
                color="#000"
                icon={({color, size}) => (
                  <Icon
                    name="card-account-details-star"
                    color={color}
                    size={30}
                  />
                )}
              />
            )}
          />
        </List.Subheader>
      </List.Section>
      {studentRecord?.map(item => {
        return (
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 10,
              margin: 10,
              borderColor: '#A9A9A9',
              shadowOffset: {width: 5, height: 5},
              shadowColor: 'black',
              shadowOpacity: 0.25,
              elevation: 10,
            }}>
               {role == 'Admin' && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Icon
                  name="pencil-circle"
                  size={25}
                  color={'#000'}
                  onPress={() => alert('edit')}
                />
                <Icon
                  name="delete-circle"
                  size={25}
                  color={'#000'}
                  onPress={() => alert('delete')}
                />
              </View>
            )}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SelectedStudent', {
                  studentDetails: item,
                })
              }>
              <List.Item
                style={{padding: 0}}
                title={['Name: ', item.name]}
                left={() => (
                  <List.Icon
                    color="#000"
                    icon={({color, size}) => (
                      <Icon2 name="briefcase" color={color} size={size} />
                    )}
                  />
                )}
              />
              <List.Item
                style={{padding: 0}}
                title={['Qualification: ', item.qualification]}
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
                style={{padding: 0}}
                title={['Profession: ', item.profession]}
                left={() => (
                  <List.Icon
                    color="#000"
                    icon={({color, size}) => (
                      <Icon3 name="briefcase" color={color} size={size} />
                    )}
                  />
                )}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
