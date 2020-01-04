import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {LoginScreen} from './src/pages/LoginScreen';
import {HomeScreen} from './src/pages/HomeScreen';
import {InforScreen} from './src/pages/InforScreen';
import {Policy} from './src/pages/Infor/Policy';
import {Personel} from './src/pages/Infor/Personel';
import {Ogchart} from './src/pages/Infor/Ogchart';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    Infor: InforScreen,
    Policy: Policy,
    Personel: Personel,
    Ogchart: Ogchart,
  },
  {
    initialRouteName: 'Login',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
