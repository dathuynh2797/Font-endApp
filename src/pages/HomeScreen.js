import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Alert,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import bgImage from '../img/bgprofile.png';
import {firebaseApp} from './config';
export class HomeScreen extends Component {
  static navigationOptions = () => {
    return {
      header: () => null,
    };
  };
  signOut() {
    firebaseApp
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  }
  handleLogout() {
    return this.props.navigation.navigate('LoginScreen');
  }
  render() {
    return (
      <SafeAreaView style={styles.body}>
        <ImageBackground style={styles.Proflie} source={bgImage}>
          <TouchableOpacity
            style={styles.btnLogut}
            onPress={() => {
              Alert.alert(
                'Đăng xuất',
                'Bạn có muốn đăng xuất không ?',
                [
                  {text: 'Huỷ bỏ', onPress: () => {}, style: 'cancel'},
                  {text: 'Đăng xuất', onPress: () => this.handleLogout()},
                ],
                {cancelable: false},
              );
              return true;
            }}>
            <Image source={require('../img/logout.png')} />
          </TouchableOpacity>
          <Text style={styles.TxtAvatar}>Xin chào</Text>
          <View style={styles.Avatar}>
            <Text>Avatar</Text>
          </View>
          <Text style={styles.TxtAvatar}>VND: 500,000,000</Text>
        </ImageBackground>
        <View style={styles.MenuContainer}>
          <View style={styles.Col}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('InforScreen');
              }}
              style={styles.Row}>
              <View style={styles.BtnStyle}>
                <Image
                  source={require('../img/information.png')}
                  style={styles.Icon}
                />
              </View>
              <View>
                <Text style={styles.Text}>Thông Tin Công Ty</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ProjectScreen');
              }}
              style={styles.Row}>
              <View style={styles.BtnStyle}>
                <Image
                  source={require('../img/project.png')}
                  style={styles.Icon}
                />
              </View>
              <View>
                <Text style={styles.Text}>Dự án bất động sản</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Col}>
            <TouchableOpacity style={styles.Row}>
              <View style={styles.BtnStyle}>
                <Image
                  source={require('../img/chart.png')}
                  style={styles.Icon}
                />
              </View>
              <View>
                <Text style={styles.Text}>Báo cáo - thông kê</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Row}>
              <View style={styles.BtnStyle}>
                <View style={styles.BtnStyle}>
                  <Image
                    source={require('../img/trip.png')}
                    style={styles.Icon}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.Text}>Công tác</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  Proflie: {
    flex: 1 / 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  btnLogut: {
    alignSelf: 'flex-end',
    width: 30,
    height: 30,
    // marginRight: 5,
  },
  Avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 103,
    width: 140,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  TxtAvatar: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    //fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.01,
  },
  MenuContainer: {
    flex: 2 / 3,
  },
  Col: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  Row: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  BtnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 50,
    width: 90,
    height: 90,
    margin: 10,
    backgroundColor: 'white',
  },
  Icon: {
    height: 50,
    width: 50,
  },
  Text: {
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
