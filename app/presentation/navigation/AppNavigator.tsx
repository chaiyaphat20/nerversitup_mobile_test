import React from 'react';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DepartmentScreen from '../department/DepartmentScreen';

export type RootStackParamList = {
  DepartmentList: undefined;
};

export const navigationRef = createNavigationContainerRef<string>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="DepartmentList">
        <Stack.Screen
          name="DepartmentList"
          component={DepartmentScreen}
          options={{ title: 'Departments' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
