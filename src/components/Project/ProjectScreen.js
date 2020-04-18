/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {ProjectNow} from './ProjectNow';
import {ProjectWas} from './ProjectWas';
import {ProjectWill} from './ProjectWill';

const FirstRoute = () => <ProjectWill />;
const SecondRoute = () => <ProjectNow />;
const ThirdRoute = () => <ProjectWas />;

export class ProjectScreen extends Component {
  state = {
    index: 1,
    routes: [
      {key: 'first', title: 'Sắp Triển Khai'},
      {key: 'second', title: 'Đang Triển Khai'},
      {key: 'third', title: 'Đã Triển Khai'},
    ],
  };

  _handleIndexChange = index => this.setState({index});

  _renderTabBar = props => (
    <TabBar
      {...props}
      tabStyle={{borderWidth: 0.5}}
      indicatorStyle={{
        height: '100%',
      }}
      style={{backgroundColor: '#f8f8ff'}}
      renderLabel={({route}) => (
        <Text style={{fontWeight: 'bold'}}>{route.title}</Text>
      )}
    />
  );
  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  render() {
    return (
      <SafeAreaView style={styles.body}>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  items: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 3,
  },
  image: {
    height: 100,
    width: 100,
    backgroundColor: '#000',
  },
  data: {
    paddingHorizontal: 10,
    marginTop: 5,
    marginLeft: 15,
  },
  title: {
    color: '#444',
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    color: '#888',
    fontWeight: '300',
  },
  price: {
    fontSize: 16,
    color: '#ff0000',
    fontWeight: '300',
  },
});
