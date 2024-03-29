// eslint-disable-next-line no-unused-vars
import React from 'react';
import Home from './src/screens/Home';
import Loading from './src/screens/Loading';
import SignUp from './src/screens/SignUp';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import 'react-native-gesture-handler';

const AppNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    Loading: {screen: Loading},
    SignUp: {screen: SignUp},
  },
  {initialRouteName: 'SignUp'},
);

export default createAppContainer(AppNavigator);
