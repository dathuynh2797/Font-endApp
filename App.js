/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {LoginScreen} from './src/Components/Screens/LoginScreen';
import {HomeScreen} from './src/Components//Screens/HomeScreen';
import {InforScreen} from './src/Components/Screens/InforScreen';
import {ProjectScreen} from './src/Components/Screens/ProjectScreen';
import {ReportScreen} from './src/Components/Screens/ReportScreen';
import {ChangePassword} from './src/Components/Screens/ChangePassword';

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

import {DetailsProject} from './src/Components/Project/DetailsProject';

import {SaleResultWeek} from './src/Components/Report/SaleResultWeek';
import {BusinessResult} from './src/Components/Report/BusinessResult';

import {location} from './src/Project/location';
import {detailPolicy} from './src/Components/Infor/detailPolicy';
import {Tq} from './src/Project/Tq';
import {Pl} from './src/Project/Pl';
import {Csbhnv} from './src/Project/Csbhnv';
import {Csbhkh} from './src/Project/Csbhkh';
import {Qc} from './src/Project/Qc';
import {Bg} from './src/Project/Bg';
import {PersonalDetail} from './src/Components/Infor/PersonalDetail';

const navOptionHandler = () => ({
  header: null,
});

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

  InfoScreen: {
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
    screen: ProjectScreen,
    navigationOptions: ({navigation}) => {
      return {
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <Title title="Dự án Bất Động Sản" />,
        headerRight: () => <HeaderRight navigation={navigation} />,
      };
    },
  },
  DetailsProject: {
    screen: DetailsProject,
    navigationOptions: navOptionHandler,
  },

  SaleResultWeek: {
    screen: SaleResultWeek,
    navigationOptions: ({navigation}) => {
      return {
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <Title title="Kết quả kinh doanh tuần" />,
        headerRight: () => <HeaderRight navigation={navigation} />,
      };
    },
  },
  BusinessResult: {
    screen: BusinessResult,
    navigationOptions: ({navigation}) => {
      return {
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <Title title="Đồ thị kết quả kinh doanh" />,
        headerRight: () => <HeaderRight navigation={navigation} />,
      };
    },
  },
  ChangePassword: ChangePassword,

  detailPolicy: detailPolicy,
  location: location,
  Tq: Tq,
  Pl: Pl,
  Csbhkh: Csbhkh,
  Csbhnv: Csbhnv,
  Qc: Qc,
  Bg: Bg,
  ReportScreen: ReportScreen,
  detail: PersonalDetail,
  Ogchartpns: Ogchartpns,
  Ogchartpkd: Ogchartpkd,
  Ogchartptc: Ogchartptc,
  Ogchartbgd: Ogchartbgd,
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
