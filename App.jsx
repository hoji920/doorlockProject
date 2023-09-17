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

import login from './components/login';
import main from './components/main';
import join from './components/join';
import pwState from './components/pwState';
import Usagedetails from './components/Usagedetails';

const Stack = createStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="main"
        screenOptions={{
          cardStyle: {backgroundColor: '#fff'}, // 원하는 백그라운드 컬러 설정
        }}>
          <Stack.Screen name="main" component={main} />
          <Stack.Screen name="login" component={login} />
          <Stack.Screen name="join" component={join} />
          <Stack.Screen name="pwState" component={pwState} />
          <Stack.Screen name="Usagedetails" component={Usagedetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
