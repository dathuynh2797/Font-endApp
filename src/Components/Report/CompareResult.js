import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';

import {PersonalCompare} from './PersonalCompare';
import {TeamCompare} from './TeamCompare';
import {GroupCompare} from './GroupCompare';

const StyleTabBar = {
  tabBarOptions: {
    upperCaseLabel: false,
    tabStyle: {
      borderWidth: 0.5,
      borderRadius: 5,
    },
    indicatorStyle: {
      height: '100%',
      borderRadius: 5,
      backgroundColor: '#95c1f0',
    },
    labelStyle: {
      fontWeight: 'bold',
      color: '#000',
    },
    style: {backgroundColor: '#f8f8ff'},
  },
};
const CompareTab = createMaterialTopTabNavigator(
  {
    First: {
      screen: PersonalCompare,
      navigationOptions: {tabBarLabel: 'Nhân Viên'},
    },
    Second: {
      screen: TeamCompare,
      navigationOptions: {tabBarLabel: 'Nhóm'},
    },
    Third: {
      screen: GroupCompare,
      navigationOptions: {tabBarLabel: 'Phòng'},
    },
  },
  StyleTabBar,
);

const CompareResult = createAppContainer(CompareTab);

export {CompareResult};
