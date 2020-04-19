/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
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
import {DetailsNow} from './src/Components/Project/DetailsNow';
import {DetailsWas} from './src/Components/Project/DetailsWas';
import {DetailsWill} from './src/Components/Project/DetailsWill';

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

import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const navOptionHandler = () => ({
  header: null,
});

const InforStack = createStackNavigator({
  InforScreen: {
    screen: InforScreen,
    navigationOptions: navOptionHandler,
  },
  Policy: {
    screen: Policy,
    navigationOptions: navOptionHandler,
  },
  Personel: {
    screen: Personel,
    navigationOptions: navOptionHandler,
  },
  Ogchart: {
    screen: Ogchart,
    navigationOptions: navOptionHandler,
  },
});

const NowStack = createStackNavigator({
  ProjectNow: {
    screen: ProjectNow,
    navigationOptions: navOptionHandler,
  },
  DetailsNow: {
    screen: DetailsNow,
    navigationOptions: navOptionHandler,
  },
});
const WasStack = createStackNavigator({
  ProjectWas: {
    screen: ProjectWas,
    navigationOptions: navOptionHandler,
  },
  DetailsWas: {
    screen: DetailsWas,
    navigationOptions: navOptionHandler,
  },
});
const WillStack = createStackNavigator({
  ProjectWill: {
    screen: ProjectWill,
    navigationOptions: navOptionHandler,
  },
  DetailsWill: {
    screen: DetailsWill,
    navigationOptions: navOptionHandler,
  },
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
WasStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
WillStack.navigationOptions = ({navigation}) => {
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
      screen: WasStack,
      navigationOptions: {tabBarLabel: 'Đã Triển Khai'},
    },
    Now: {
      screen: NowStack,
      navigationOptions: {tabBarLabel: 'Đang Triển Khai'},
    },
    Will: {
      screen: WillStack,
      navigationOptions: {tabBarLabel: 'Sắp Triển Khai'},
    },
  },
  options,
);

Tab.navigationOptions = ({navigation}) => ({});

const AuthStack = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: navOptionHandler,
  },
  ForgotScreen: {
    screen: ForgotPassword,
    navigationOptions: navOptionHandler,
  },
});

const MainStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: navOptionHandler,
  },
  Infor: {
    screen: InforStack,
    navigationOptions: navOptionHandler,
  },
  Project: {
    screen: Tab,
    navigationOptions: navOptionHandler,
  },
  // ProjectDetails: ProjectDetails,
  Qdctp: Qdctp,
  // Project: Project,
  location: location,
  Cdlt: Cdlt,
  Bnns: Bnns,
  Hdtb: Hdtb,
  // Lnl: Lnl,
  Tq: Tq,
  Pl: Pl,
  Csbhkh: Csbhkh,
  Csbhnv: Csbhnv,
  Qc: Qc,
  Bg: Bg,
  baocao: baocao,
  detail: detail,
});

const MainApp = createSwitchNavigator(
  {
    app: MainStack,
    auth: AuthStack,
  },
  {
    initialRouteName: 'auth',
  },
);

const AppContainer = createAppContainer(MainApp);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
