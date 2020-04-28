import {ProjectNow} from './ProjectNow';
import {ProjectWas} from './ProjectWas';
import {ProjectWill} from './ProjectWill';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

const StyleTabBar = {
  initialRouteName: 'Now',
  tabBarOptions: {
    upperCaseLabel: false,
    tabStyle: {
      borderWidth: 0.5,
      borderRadius: 5,
    },
    indicatorStyle: {
      height: '100%',
      borderRadius: 5,
    },
    labelStyle: {
      fontWeight: 'bold',
      color: '#000',
    },
    style: {backgroundColor: '#f8f8ff'},
  },
};

const ProjectTab = createMaterialTopTabNavigator(
  {
    Was: {
      screen: ProjectWas,
      navigationOptions: {tabBarLabel: 'Đã Triển Khai'},
    },
    Now: {
      screen: ProjectNow,
      navigationOptions: {tabBarLabel: 'Đang Triển Khai'},
    },
    Will: {
      screen: ProjectWill,
      navigationOptions: {tabBarLabel: 'Sắp Triển Khai'},
    },
  },
  StyleTabBar,
);

const ProjectScreen = createAppContainer(ProjectTab);

export {ProjectScreen};
