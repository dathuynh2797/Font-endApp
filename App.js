/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoginScreen} from './src/Components/LoginScreen';
import {HomeScreen} from './src/Components/HomeScreen';
import {InforScreen} from './src/Components/Home/InforScreen';
import {Loading} from './src/Components/Loading';
import {Policy} from './src/Components/Infor/Policy';
import {Personel} from './src/Components/Infor/Personel';
import {Ogchart} from './src/Components/Infor/Ogchart';
import {Ogchartpns} from './src/Components/Infor/Ogchartpns';
import {Ogchartptc} from './src/Components/Infor/Ogchartptc';
import {Ogchartbgd} from './src/Components/Infor/Ogchartbgd';
import {Ogchartpkd} from './src/Components/Infor/Ogchartpkd';
import {ForgotPassword} from './src/Components/ForgotPassword';

import {HeaderRight, Title, HeaderLeft} from './src/Components/CustomHeader';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from 'react-navigation-tabs';
import {SafeAreaView} from 'react-native';
import {ProjectNow} from './src/Components/Project/ProjectNow';
import {ProjectWas} from './src/Components/Project/ProjectWas';
import {ProjectWill} from './src/Components/Project/ProjectWill';
import {DetailsNow} from './src/Components/Project/DetailsNow';

import {SaleResultWeek} from './src/Components/Report/SaleResultWeek';
import {BusinessResult} from './src/Components/Report/BusinessResult';

import {location} from './src/Project/location';
import {Qdctp} from './src/Components/Infor/Qdctp';
import {Lnl} from './src/Components/Infor/Lnl';
import {Cdlt} from './src/Components/Infor/Cdlt';
import {Bnns} from './src/Components/Infor/Bnns';
import {Hdtb} from './src/Components/Infor/Hdtb';
import {Tq} from './src/Project/Tq';
import {Pl} from './src/Project/Pl';
import {Csbhnv} from './src/Project/Csbhnv';
import {Csbhkh} from './src/Project/Csbhkh';
import {Qc} from './src/Project/Qc';
import {Bg} from './src/Project/Bg';
import {baocao} from './src/Components/Report/baocao';
import {detail} from './src/Components/Infor/detail';
// import {Platform} from 'react-native';
// import {decode, encode} from 'base-64';

// if (Platform.OS === 'ios') {
//   if (!global.btoa) {
//     global.btoa = encode;
//   }

//   if (!global.atob) {
//     global.atob = decode;
//   }
// }

const navOptionHandler = () => ({
  header: null,
});

const navTabHandler = ({navigation}) => ({
  headerLeft: () => <HeaderLeft navigation={navigation} />,
  headerTitle: () => <Title title="Dự án Bất Động Sản" />,
  headerRight: () => <HeaderRight navigation={navigation} />,
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
    screen: DetailsNow,
  },
});
const WillStack = createStackNavigator({
  ProjectWill: {
    screen: ProjectWill,
    navigationOptions: navOptionHandler,
  },
  DetailsWill: {
    screen: DetailsNow,
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

const AuthStack = createStackNavigator({
  Loading: {
    screen: Loading,
    navigationOptions: navOptionHandler,
  },
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

  InforScreen: {
    screen: InforScreen,
    navigationOptions: ({navigation}) => {
      return {
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <Title title="Xem Thông Tin" />,
        headerRight: () => <HeaderRight navigation={navigation} />,
      };
    },
  },
  Policy: {
    screen: Policy,
    navigationOptions: ({navigation}) => {
      return {
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <Title title="Chính Sách Công Ty" />,
        headerRight: () => <HeaderRight navigation={navigation} />,
      };
    },
  },
  Personel: {
    screen: Personel,
    navigationOptions: ({navigation}) => {
      return {
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <Title title="Danh Sách Nhân Sự" />,
        headerRight: () => <HeaderRight navigation={navigation} />,
      };
    },
  },
  Ogchart: {
    screen: Ogchart,
    navigationOptions: ({navigation}) => {
      return {
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <Title title="Sơ Đồ Tổ Chức" />,
        headerRight: () => <HeaderRight navigation={navigation} />,
      };
    },
  },

  Project: {
    screen: Tab,
    // navigationOptions: ({navigation}) => {
    // return {
    //   headerLeft: () => <HeaderLeft navigation={navigation} />,
    //   headerTitle: () => <Title title="Dự án Bất Động Sản" />,
    //   headerRight: () => <HeaderRight navigation={navigation} />,
    // };
    // },
    navigationOptions: navTabHandler,
  },
  // ProjectDetails: ProjectDetails,
  Qdctp: Qdctp,
  // Project: Project,
  location: location,
  Cdlt: Cdlt,
  Bnns: Bnns,
  Hdtb: Hdtb,
  Lnl: Lnl,
  Tq: Tq,
  Pl: Pl,
  Csbhkh: Csbhkh,
  Csbhnv: Csbhnv,
  Qc: Qc,
  Bg: Bg,
  baocao: baocao,
  detail: detail,
  Ogchartpns: Ogchartpns,
  Ogchartpkd: Ogchartpkd,
  Ogchartptc: Ogchartptc,
  Ogchartbgd: Ogchartbgd,
  SaleResultWeek: SaleResultWeek,
  BusinessResult: BusinessResult,
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
