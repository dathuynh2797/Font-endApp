/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoginScreen} from './src/components/LoginScreen';
import {HomeScreen} from './src/components/HomeScreen';
import {InforScreen} from './src/components/Home/InforScreen';
import {Policy} from './src/components/Infor/Policy';
import {Personel} from './src/components/Infor/Personel';
import {Ogchart} from './src/components/Infor/Ogchart';
import {ForgotPassword} from './src/components/ForgotPassword';

import {CustomHeader} from './src/components/CustomHeader';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
import {SafeAreaView} from 'react-native';
import {ProjectNow} from './src/components/Project/ProjectNow';
import {ProjectWas} from './src/components/Project/ProjectWas';
import {ProjectWill} from './src/components/Project/ProjectWill';
import {ProjectDetails} from './src/components/Project/ProjectDetails';

// import {Project} from './src/Project/Project';
// import {location} from './src/Project/location';
// import {Qdctp} from './src/pages/Infor/Qdctp';
// import {Cdlt} from './src/pages/Infor/Cdlt';
// import {Bnns} from './src/pages/Infor/Bnns';
// import {Hdtb} from './src/pages/Infor/Hdtb';
// import {Lnl} from './src/pages/Infor/Lnl';
// import {Tq} from './src/Project/Tq';
// import {Pl} from './src/Project/Pl';
// import {Csbhnv} from './src/Project/Csbhnv';
// import {Csbhkh} from './src/Project/Csbhkh';
// import {Qc} from './src/Project/Qc';
// import {Bg} from './src/Project/Bg';
// import {baocao} from './src/baocao/baocao';
// import {detail} from './src/pages/Infor/detail';

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
    LoginScreen: LoginScreen,
    ForgotPassword: ForgotPassword,

    HomeScreen: {screen: HomeScreen, navigationOptions: navOptionHandler},
    Infor: {screen: InforStack, navigationOptions: navOptionHandler},
    Project: {screen: Tab, navigationOptions: navOptionHandler},
    // ProjectDetails: ProjectDetails,
    // Qdctp: Qdctp,
    // Project: Project,
    // location: location,
    // Cdlt: Cdlt,
    // Bnns: Bnns,
    // Hdtb: Hdtb,
    // Lnl: Lnl,
    // Tq: Tq,
    // Pl: Pl,
    // Csbhkh: Csbhkh,
    // Csbhnv: Csbhnv,
    // Qc: Qc,
    // Bg: Bg,
    // baocao: baocao,
    // detail: detail,
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
