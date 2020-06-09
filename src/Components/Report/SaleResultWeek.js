import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {HeaderLeft, HeaderRight, Title} from '../CustomHeader';
import {createAppContainer} from 'react-navigation';
import {PersonalResult} from './PersonalResult';
import {TeamResult} from './TeamResult';

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

const SaleTab = createMaterialTopTabNavigator(
  {
    First: {
      screen: PersonalResult,
      navigationOptions: {tabBarLabel: 'Nhân Sự'},
    },
    Second: {
      screen: TeamResult,
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

const SaleResultWeek = createAppContainer(SaleTab);

export {SaleResultWeek};
