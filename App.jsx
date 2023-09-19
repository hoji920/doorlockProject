/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './components/Login';
import Main from './components/Main';
import Join from './components/Join';
import PwState from './components/PwState';
import Usagedetails from './components/Usagedetails';
import TemporaryPw from './components/TemporaryPw';
import UseBook from './components/UseBook';

const Stack = createStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="main"
        screenOptions={{
          cardStyle: {backgroundColor: '#fff'}, // 원하는 백그라운드 컬러 설정
        }}>
          <Stack.Screen name="main" component={Main} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="join" component={Join} />
          <Stack.Screen name="pwState" component={PwState} />
          <Stack.Screen name="Usagedetails" component={Usagedetails} />
          <Stack.Screen name="TemporaryPw" component={TemporaryPw} />
          <Stack.Screen name="UseBook" component={UseBook} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
