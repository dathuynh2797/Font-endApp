import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {HomeScreen} from './src/pages/HomeScreen';
import {InforScreen} from './src/pages/InforScreen';
import {Policy} from './src/pages/Infor/Policy';
import {Ogchart} from './src/pages/Infor/Ogchart';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Infor: InforScreen,
    Policy: Policy,
    Ogchart: Ogchart,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
