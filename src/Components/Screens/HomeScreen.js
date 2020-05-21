/* eslint-disable react-native/no-inline-styles */
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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import bgImage from '../../img/bgprofile.png';
import {firebaseApp} from '../config';

export class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      avatar: [],
      loading: true,
    };
  }

  birthday() {}
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
  componentDidMount() {
    const vitri = firebaseApp.firestore().collection('user');
    vitri.onSnapshot(querySnapshot => {
      var marker1 = [];
      querySnapshot.forEach(doc => {
        if (
          firebaseApp.auth().currentUser.uid === doc.data().authenticationUid
        ) {
          marker1.push({
            ten: doc.data().fullName,
            ava: doc.data().hinhanh,
            email: doc.data().email,
            sdt: doc.data().phoneNumber,
            doanhso: [
              doc.data().doanhso[0].year[doc.data().doanhso[0].year.length - 1],
            ],
          });
          this.setState({
            avatar: marker1,
          });
        }
      });
    });
  }

  handleLogout() {
    firebaseApp
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('LoginScreen'));
  }
  render() {
    return (
      <SafeAreaView style={styles.Container}>
        <View style={styles.top}>
          <ImageBackground style={styles.backgroundImg} source={bgImage}>
            <TouchableOpacity
              style={styles.buttonLogout}
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
              <Image source={require('../../img/logout.png')} />
            </TouchableOpacity>
            <FlatList
              data={this.state.avatar}
              renderItem={({item}) => (
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarTxt}>Xin chào: {item.ten}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('userDetail', {
                        id: item.id,
                        ten: item.ten,
                        sdt: item.sdt,
                        namsinh: item.namsinh,
                        hinhanh: item.ava,
                        email: item.email,
                      });
                    }}>
                    <Image style={styles.avatar} source={{uri: item.ava}} />
                    <ActivityIndicator
                      animating={this.state.loading === false}
                    />
                    <Text style={styles.avatarTxt}>
                      {item.doanhso.toLocaleString()} VND
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item => item.ten, item => item.ava)}
            />
          </ImageBackground>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              this.props.navigation.navigate('InfoScreen');
            }}>
            <View style={styles.menuIcon}>
              <View style={styles.menuIconCircle}>
                <Image
                  source={require('../../img/information.png')}
                  style={styles.menuImg}
                />
              </View>
            </View>
            <View style={styles.menuTitle}>
              <Text style={styles.menuTitleTxt}>Thông tin công ty</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              this.props.navigation.navigate('Project');
            }}>
            <View style={styles.menuIcon}>
              <View style={styles.menuIconCircle}>
                <Image
                  source={require('../../img/project.png')}
                  style={styles.menuImg}
                />
              </View>
            </View>
            <View style={styles.menuTitle}>
              <Text style={styles.menuTitleTxt}>Dự án bất động sản</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              this.props.navigation.navigate('ReportScreen');
            }}>
            <View style={styles.menuIcon}>
              <View style={styles.menuIconCircle}>
                <Image
                  source={require('../../img/chart.png')}
                  style={styles.menuImg}
                />
              </View>
            </View>
            <View style={styles.menuTitle}>
              <Text style={styles.menuTitleTxt}>Báo cáo - Thống kê</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              this.props.navigation.navigate('ImgPickker');
            }}>
            <View style={styles.menuIcon}>
              <View style={styles.menuIconCircle}>
                <Image
                  source={require('../../img/trip.png')}
                  style={styles.menuImg}
                />
              </View>
            </View>
            <View style={styles.menuTitle}>
              <Text style={styles.menuTitleTxt}>Công tác</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  top: {
    height: '40%',
  },
  buttonLogout: {
    height: '10%',
    alignSelf: 'flex-end',
    padding: 10,
  },
  backgroundImg: {
    height: '100%',
    width: '100%',
  },
  avatarContainer: {
    height: '90%',
    alignItems: 'center',
  },
  avatar: {
    // resizeMode: 'stretch',
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    margin: 20,
  },
  avatarTxt: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  menuContainer: {
    height: '60%',
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
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  menuIconCircle: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 100,
  },
  menuImg: {
    height: 70,
    width: 70,
  },
  menuTitle: {
    height: '20%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 25,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  menuTitleTxt: {
    fontSize: 16,
  },
});
