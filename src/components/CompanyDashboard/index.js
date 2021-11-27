import React from 'react';
import {View, Text, Button} from 'react-native';
import {removeData} from '../../store/action';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

export default function CompanyDashboard({navigation}) {
  const dispatch = useDispatch();

  const clickMe = () => {
    dispatch(removeData());
    setTimeout(() => {
      navigation.navigate('Auth');
    }, 2000);
  };
  return (
    <View>
      <Text>Company Dashboard here</Text>
      <Button title="Sign Out" onPress={clickMe} />
    </View>
  );
}
