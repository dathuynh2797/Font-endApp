/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoginScreen} from './src/Components/LoginScreen';
import {HomeScreen} from './src/Components/HomeScreen';
import {InforScreen} from './src/Components/Home/InforScreen';
import {Policy} from './src/Components/Infor/Policy';
import {Personel} from './src/Components/Infor/Personel';
import {Ogchart} from './src/Components/Infor/Ogchart';
import {Ogchartpns} from './src/Components/Infor/Ogchartpns';
import {Ogchartptc} from './src/Components/Infor/Ogchartptc';
import {Ogchartbgd} from './src/Components/Infor/Ogchartbgd';
import {Ogchartpkd} from './src/Components/Infor/Ogchartpkd';
import {ForgotPassword} from './src/Components/ForgotPassword';

import {CustomHeader} from './src/Components/CustomHeader';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
import {SafeAreaView} from 'react-native';
import {ProjectNow} from './src/Components/Project/ProjectNow';
import {ProjectWas} from './src/Components/Project/ProjectWas';
import {ProjectWill} from './src/Components/Project/ProjectWill';
import {ProjectDetails} from './src/Components/Project/ProjectDetails';

import {location} from './src/Project/location';
import {Qdctp} from './src/Components/Infor/Qdctp';
import {Cdlt} from './src/Components/Infor/Cdlt';
import {Bnns} from './src/Components/Infor/Bnns';
import {Hdtb} from './src/Components/Infor/Hdtb';
import {Tq} from './src/Project/Tq';
import {Pl} from './src/Project/Pl';
import {Csbhnv} from './src/Project/Csbhnv';
import {Csbhkh} from './src/Project/Csbhkh';
import {Qc} from './src/Project/Qc';
import {Bg} from './src/Project/Bg';
import {baocao} from './src/baocao/baocao';
import {detail} from './src/Components/Infor/detail';

const navOptionHandler = () => ({
  header: null,
});

const InforStack = createStackNavigator({
  InforScreen: {
    screen: InforScreen,
    navigationOptions: navOptionHandler,
  },
  Policy: {screen: Policy, navigationOptions: navOptionHandler},
  Personel: {screen: Personel, navigationOptions: navOptionHandler},
  Ogchart: {screen: Ogchart, navigationOptions: navOptionHandler},
});

const NowStack = createStackNavigator({
  ProjectNow: {screen: ProjectNow, navigationOptions: navOptionHandler},
  ProjectDetails: {screen: ProjectDetails, navigationOptions: navOptionHandler},
});

NowStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const SafeAreaMaterialTopTabBar = ({...props}) => (
  <SafeAreaView>
    <CustomHeader
      title="Dự án Bất Động Sản"
      // navigation={this.props.navigation}
    />
    <MaterialTopTabBar
      {...props}
      tabStyle={{
        borderWidth: 0.5,
        borderRadius: 5,
      }}
      indicatorStyle={{
        height: '100%',
        borderRadius: 5,
      }}
      style={{backgroundColor: '#f8f8ff'}}
      labelStyle={{fontWeight: 'bold', color: '#000'}}
    />
  </SafeAreaView>
);

const options = {
  tabBarComponent: props => <SafeAreaMaterialTopTabBar {...props} />,
  initialRouteName: 'Now',
  tabBarOptions: {upperCaseLabel: false},
};

const Tab = createMaterialTopTabNavigator(
  {
    Was: {
      screen: ProjectWas,
      navigationOptions: {tabBarLabel: 'Đã Triển Khai'},
    },
    Now: {
      screen: NowStack,
      navigationOptions: {tabBarLabel: 'Đang Triển Khai'},
    },
    Will: {
      screen: ProjectWill,
      navigationOptions: {tabBarLabel: 'Sắp Triển Khai'},
    },
  },
  options,
);

const MainApp = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: navOptionHandler,
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: navOptionHandler,
    },

    HomeScreen: {screen: HomeScreen, navigationOptions: navOptionHandler},
    Infor: {screen: InforStack, navigationOptions: navOptionHandler},
    Project: {screen: Tab, navigationOptions: navOptionHandler},
    ProjectDetails: ProjectDetails,
    Qdctp: Qdctp,
    location: location,
    Cdlt: Cdlt,
    Bnns: Bnns,
    Hdtb: Hdtb,
    Tq: Tq,
    Pl: Pl,
    Csbhkh: Csbhkh,
    Csbhnv: Csbhnv,
    Qc: Qc,
    Bg: Bg,
    baocao: baocao,
    detail: detail,
    Ogchartpns: Ogchartpns,
    Ogchartbgd: Ogchartbgd,
    Ogchartpkd: Ogchartpkd,
    Ogchartptc: Ogchartptc,
  },
  {
    initialRouteName: 'LoginScreen',
  },
);

const AppContainer = createAppContainer(MainApp);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
