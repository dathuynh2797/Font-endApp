/* eslint-disable react-native/no-inline-styles */

import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {firebaseApp} from '../config';
import 'firebase/firestore';
import {FlatList} from 'react-native-gesture-handler';

const FirstRoute = () => (
  <View style={styles.scene}>
    <TouchableOpacity>
      <View style={styles.items}>
        <View style={styles.image} />
        <View style={styles.data}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.description}>Location</Text>
          <Text style={styles.price}>Price</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const SecondRoute = () => (
  <View style={styles.scene}>
    <TouchableOpacity>
      <View style={styles.items}>
        <View style={styles.image} />
        <View style={styles.data}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.description}>Location</Text>
          <Text style={styles.price}>Price</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);
const ThirdRoute = () => (
  <View style={styles.scene}>
    <TouchableOpacity>
      <View style={styles.items}>
        <View style={styles.image} />
        <View style={styles.data}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.description}>Location</Text>
          <Text style={styles.price}>gia</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);
export class ProjectScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Dự Án Bất Động Sản',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate({routeName: 'HomeScreen'})}>
          <Image
            source={require('../../img/exit.png')}
            style={styles.iconBack}
          />
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#0A053F',
      headerTitleAlign: 'center',
    };
  };
  // constructor() {
  //   super();
  //   this.state = {
  //     tableData: [],
  //   };
  // }
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
  componentDidMount() {
    const abc = firebaseApp.firestore();
    abc.collection('suppliers').onSnapshot(querySnapshot => {
      var duan = [];
      querySnapshot.forEach(doc => {
        duan.push({
          id: doc.id,
          ten: doc.data().tên,
          vitri: doc.data().vitri,
          gia: doc.data().giá,
        });
        this.setState({
          tableData: duan,
        });
      });
    });
  }
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
  iconBack: {
    width: 30,
    height: 30,
  },
});
