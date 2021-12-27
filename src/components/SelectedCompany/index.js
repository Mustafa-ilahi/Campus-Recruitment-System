import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Divider, Drawer, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';

export default function SelectedCompany({navigation, route}) {
  const companyDetails = route.params.companyDetails;
  console.log(companyDetails);
  return (
    <View style={styles.container}>
      <List.Section style={{marginTop: 0}}>
        <List.Subheader style={{alignSelf: 'center'}}>
          <List.Item
            title={`${companyDetails.companyName}'s Detail`}
            titleStyle={{fontWeight: 'bold'}}
          />
        </List.Subheader>
        <Divider style={{borderWidth: 0.3, borderColor: '#cacaca'}} />

        <List.Item
          style={{padding: 0}}
          title={['Company Name: ', companyDetails.companyName]}
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
          title={['Job Title: ', companyDetails.jobTitle]}
          left={() => (
            <List.Icon
              color="#000"
              icon={({color, size}) => (
                <Icon2 name="subtitles" color={color} size={size} />
              )}
            />
          )}
        />
        <List.Item
          style={{padding: 0}}
          title={['No. of hiring: ', companyDetails.hiringNum]}
          left={() => (
            <List.Icon
              color="#000"
              icon={({color, size}) => (
                <Icon3 name="list-circle-sharp" color={color} size={size} />
              )}
            />
          )}
        />
        <List.Item
          style={{padding: 0}}
          title={['Email: ', companyDetails.email]}
          left={() => (
            <List.Icon
              color="#000"
              icon={({color, size}) => (
                <Icon name="email" color={color} size={size} />
              )}
            />
          )}
        />
        <List.Item
          style={{padding: 0}}
          title={['Job Description:']}
          left={() => (
            <List.Icon
              color="#000"
              icon={({color, size}) => (
                <Icon2 name="description" color={color} size={size} />
              )}
            />
          )}
        />

        <Text style={styles.jobDescription}>
          {companyDetails.jobDescription}
        </Text>
      </List.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  jobDescription: {
    textAlign: 'justify',
    // flex:1,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
    //   margin:5
    //   color:"#000"
  },
});
