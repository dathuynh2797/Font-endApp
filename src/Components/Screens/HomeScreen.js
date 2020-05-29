/* eslint-disable react-native/no-inline-styles */
import React, {Component,useState} from 'react';
import { Dialog } from 'react-native-simple-dialogs';
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
const moment = require('moment');

export class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      ngaysinh: '',
      loading: true,
      dialogVisible: false,
    };
  }
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
    const dulieu = firebaseApp.firestore().collection('user');
    dulieu.onSnapshot(querySnapshot => {
      var marker = [];
      var days = '';
      querySnapshot.forEach(doc => {
        if (
          firebaseApp.auth().currentUser.uid === doc.data().authenticationUid
        ) {
          let arr = [];
          let dataDoanhSo = doc.data().doanhso[0].year;
          for (let i = 0; i <= dataDoanhSo.length - 1; i++) {
            if (dataDoanhSo[i] !== null) {
              arr.push(dataDoanhSo[i]);
            }
          }
          days = doc.data().staffDateOfBirth;
          marker.push({
            ten: doc.data().fullName,
            ava: doc.data().avatars[0].publicUrl,
            email: doc.data().email,
            sdt: doc.data().phoneNumber,
            doanhso: [arr[arr.length - 1]],
          });
          this.setState({
            data: marker,
            loading: false,
            ngaysinh: days,
          });
        }
      });
    });
    const {navigation} = this.props;
   const sinhnhat = navigation.getParam('birth', 'chưa có dữ liệu');
   const birthday = navigation.getParam('birthday', 'chua co du lieu');
    let day = null;
    day = moment().format('DD-MM');
    if (day === birthday || day === sinhnhat) { 
     this.setState({
       dialogVisible: true
     })
    }
  }

  handleLogout() {
    firebaseApp
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('LoginScreen'));
  }
  // birthday() {
  //   const {navigation} = this.props;
  //   const sinhnhat = navigation.getParam('sinhnhat', 'chưa có dữ liệu');
  //   // let day = null;
  //   // day = moment().format('DD-MM');
  //   console.log(this.state.ngaysinh);
  //   if (sinhnhat === this.state.ngaysinh) {
  //     Alert.alert('chuc mung sinh nhat');
  //   }
  // }
  render() {
    return (
      <SafeAreaView style={styles.Container}>
        <View style={styles.top}>
        <Dialog
        visible={this.state.dialogVisible}
        title="Chúc Mừng Sinh Nhật"
        titleStyle={{color: 'rgba(240, 36, 63, 0.65)'}}
        overlayStyle={{backgroundColor:'rgba(0,0,0,.1)'}}
        dialogStyle={{borderRadius:20, height: 300, backgroundColor:'rgba(180, 191, 233, 0.9)'}}
        onTouchOutside={() => this.setState({dialogVisible: false})} >
        <View>
        <Text></Text>
        <TouchableOpacity onPress={()=>{this.setState({dialogVisible: false})}} style={{borderRadius: 45,
         justifyContent: 'center',
         backgroundColor: '#1085B8', height: 30,width: 30}}></TouchableOpacity>
        </View>
        </Dialog>
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
            {this.state.loading && (
              <ActivityIndicator
                size="large"
                color="#CBF7FD"
                animating={true}
                style={styles.avatarContainer}
              />
            )}
            {!this.state.loading && (
              <FlatList
                data={this.state.data}
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
                      <View style={{alignItems: 'center'}}>
                        <Image style={styles.avatar} source={{uri: item.ava}} />
                        <Text style={styles.avatarTxt}>
                          {item.doanhso
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                          VND
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item => item.ten, item => item.ava)}
              />
            )}
          </ImageBackground>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            activeOpacity={1}
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
            activeOpacity={1}
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
            activeOpacity={1}
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
            activeOpacity={1}
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
    resizeMode: 'cover',
    width: 140,
    height: 140,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    margin: 10,
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
