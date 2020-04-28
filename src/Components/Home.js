/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

export class Home extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity style={styles.buttonLogout}>
            <Image source={require('../img/logout.png')} />
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            <Text>Xin chào</Text>
            <TouchableOpacity style={styles.avatar} />
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Image
                source={require('../img/information.png')}
                style={styles.menuImg}
              />
            </View>
            <View style={styles.menuTitle}>
              <Text style={styles.menuTitleTxt}>Thông tin công ty</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Image
                source={require('../img/information.png')}
                style={styles.menuImg}
              />
            </View>
            <View style={styles.menuTitle}>
              <Text style={styles.menuTitleTxt}>Thông tin công ty</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Image
                source={require('../img/information.png')}
                style={styles.menuImg}
              />
            </View>
            <View style={styles.menuTitle}>
              <Text style={styles.menuTitleTxt}>Báo cáo - Thống Kê</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Image
                source={require('../img/information.png')}
                style={styles.menuImg}
              />
            </View>
            <View style={styles.menuTitle}>
              <Text style={styles.menuTitleTxt}>Thông tin công ty</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    height: '45%',
    backgroundColor: '#98dc21',
  },
  buttonLogout: {
    height: '10%',
    alignSelf: 'flex-end',
  },
  avatarContainer: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  menuContainer: {
    height: '55%',
    backgroundColor: 'aqua',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  menuItem: {
    width: '50%',
    height: '50%',
    padding: 15,
  },
  menuIcon: {
    height: '80%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuImg: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
  },
  menuTitle: {
    height: '20%',
    backgroundColor: '#fff',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitleTxt: {
    fontSize: 18,
  },
});
