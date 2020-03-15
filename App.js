import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {LoginScreen} from './src/pages/LoginScreen';
import {HomeScreen} from './src/pages/HomeScreen';
import {InforScreen} from './src/pages/InforScreen';
import {Policy} from './src/pages/Infor/Policy';
import {Personel} from './src/pages/Personel';
import {Ogchart} from './src/pages/Infor/Ogchart';
import {ForgotPassword} from './src/pages/ForgotPassword';
import {Project} from './src/Project/Project';
import {location} from './src/Project/location';
const AppNavigator = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    HomeScreen: HomeScreen,
    InforScreen: InforScreen,
    Policy: Policy,
    Personel: Personel,
    Ogchart: Ogchart,
    ForgotPassword: ForgotPassword,
    Project: Project,
    location: location,
  },
  {
    initialRouteName: 'LoginScreen',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
