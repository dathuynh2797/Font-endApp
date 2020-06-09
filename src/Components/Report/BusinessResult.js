import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {PersonalBusiness} from './PersonalBusiness';
import {TeamBusiness} from './TeamBusiness';
import {GroupBusiness} from './GroupBusiness';

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
const BusinessTab = createMaterialTopTabNavigator(
  {
    First: {
      screen: PersonalBusiness,
      navigationOptions: {tabBarLabel: 'Nhân Sự'},
    },
    Second: {
      screen: TeamBusiness,
      navigationOptions: {tabBarLabel: 'Nhóm'},
    },
    Third: {
      screen: GroupBusiness,
      navigationOptions: {tabBarLabel: 'Phòng'},
    },
  },
  StyleTabBar,
);

const BusinessResult = createAppContainer(BusinessTab);

export {BusinessResult};
