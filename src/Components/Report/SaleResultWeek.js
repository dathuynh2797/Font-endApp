import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {HeaderLeft, HeaderRight, Title} from '../CustomHeader';
import {createAppContainer} from 'react-navigation';
import {PersonalResult} from './PersonalResult';

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
    },
    labelStyle: {
      fontWeight: 'bold',
      color: '#000',
    },
    style: {backgroundColor: '#f8f8ff'},
  },
};

const SaleTab = createMaterialTopTabNavigator(
  {
    First: {
      screen: PersonalResult,
      navigationOptions: {tabBarLabel: 'Nhân Sự'},
    },
    Second: {
      screen: Second,
      navigationOptions: {tabBarLabel: 'Nhóm'},
    },
    Third: {
      screen: Third,
      navigationOptions: {tabBarLabel: 'Phòng'},
    },
  },
  StyleTabBar,
);
function Second() {
  return (
    <View>
      <Text> textInComponent </Text>
    </View>
  );
}
function Third() {
  return (
    <View>
      <Text> Hello </Text>
    </View>
  );
}

export class SaleResultWeek extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerTitle: () => <Title title="Kết quả kinh doanh tuần" />,
      headerRight: () => <HeaderRight navigation={navigation} />,
    };
  };
  render() {
    return <SaleStack />;
  }
}

const SaleStack = createAppContainer(SaleTab);
