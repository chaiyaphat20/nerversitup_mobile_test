import * as React from 'react';
import AppNavigator from './presentation/navigation/AppNavigator';
import { SafeAreaView } from 'react-native';


export default function App() {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <AppNavigator />
    </SafeAreaView>
  );
}