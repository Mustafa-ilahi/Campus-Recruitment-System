import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Divider, Drawer, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

export default function StudentDashboard({navigation}) {
  const [companyRecord, setCompanyRecord] = useState([]);

  useEffect(() => {
    let tempData = [];
    firestore()
      .collection('CompanyDetails')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(item => {
          tempData.push(item.data());
        });
        setCompanyRecord(tempData);
        // console.log(tempData);
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
            title="Company Details"
            titleStyle={{fontSize: 20}}
            left={() => (
              <List.Icon
                color="#000"
                icon={({color, size}) => (
                  <Icon
                    name="card-account-details-outline"
                    color={color}
                    size={30}
                  />
                )}
              />
            )}
          />
        </List.Subheader>
      </List.Section>
      {companyRecord?.map(item => {
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
            <TouchableOpacity
            onPress={() =>
              navigation.navigate('SelectedCompany', {
                companyDetails: item,
              })
            }
            >
              <List.Item
                style={{padding: 0}}
                title={['Company Name: ', item.companyName]}
                left={() => (
                  <List.Icon
                    color="#000"
                    icon={({color, size}) => (
                      <Icon2 name="work" color={color} size={size} />
                    )}
                  />
                )}
              />
              <List.Item
                style={{padding: 0}}
                title={['Job Title: ', item.jobTitle]}
                titleStyle={{alignSelf: 'center'}}
                left={() => (
                  <List.Icon
                    color="#000"
                    icon={({color, size}) => (
                      <Icon2 name="subtitles" color={color} size={size} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
