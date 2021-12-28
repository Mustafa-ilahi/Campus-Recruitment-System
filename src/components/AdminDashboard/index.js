import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import StudentDashboard from '../StudentDashboard';
import CompanyDashboard from '../CompanyDashboard';
export default function AdminDashboard({navigation}) {
  return (
    <ScrollView>
      <StudentDashboard navigation={navigation}/>
      <CompanyDashboard navigation={navigation}/>
    </ScrollView>
  );
}
