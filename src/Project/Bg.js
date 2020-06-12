/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
// import {firebaseApp} from './config';
const {width: WIDTH} = Dimensions.get('window');
export class Bg extends Component {
  render() {
    const {navigation} = this.props;
    const hinhanhbg = navigation.getParam('hinhanhbg', 'chưa có dữ liệu');
    return (
      <View style={{flex: 1}}>
        <Image
          source={{
            uri: hinhanhbg,
          }}
          style={styles.Proflie}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Proflie: {
    resizeMode: 'center',
    flex: 1,
    // width: 180,
    // marginLeft: 10,
    // marginRight: 10,
    // height: 0,
  },
  headerText: {
    width: WIDTH - 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 40,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#2D389C',
  },
  iconBack: {
    width: 30,
    height: 30,
  },
});
