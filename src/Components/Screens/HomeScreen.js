/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Dialog} from 'react-native-simple-dialogs';
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
import {RFValue} from 'react-native-responsive-fontsize';
var Sound = require('react-native-sound');
const moment = require('moment');
export class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      ngaysinh: '',
      loading: true,
      dialogVisible: false,
      nameBirth: [],
      stop: null,
      phong: '',
      team: '',
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

  renderStaffName = () => {
    return this.state.nameBirth.map((name, index) => {
      return (
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: 20,
            fontStyle: 'italic',
            color: 'rgb(16,54,153)',
          }}
          key={index}>
          {name.nameBD}
        </Text>
      );
    });
  };

  componentDidMount() {
    firebaseApp
      .firestore()
      .collection('user')
      .onSnapshot(querySnapshot => {
        var data = [];
        var days = '';
        var tenphong = '';
        var tennhom = '';
        querySnapshot.forEach(doc => {
          if (
            firebaseApp.auth().currentUser.uid === doc.data().authenticationUid
          ) {
            var idphonguser = doc.data().productUnit;
            var idteamuser = doc.data().iamTeam;
            firebaseApp
              .firestore()
              .collection('stall')
              .onSnapshot(querySnapshot1 => {
                querySnapshot1.forEach(doc1 => {
                  if (idteamuser === doc1.data().id) {
                    tennhom = doc1.data().teamName;
                  }
                });
                this.setState({team: tennhom});
              });
            firebaseApp
              .firestore()
              .collection('units')
              .onSnapshot(querySnapshot1 => {
                querySnapshot1.forEach(doc1 => {
                  if (idphonguser === doc1.data().id) {
                    tenphong = doc1.data().unitsTitle;
                  }
                });
                this.setState({phong: tenphong});
              });
            let arr = [];
            let dataDoanhSo = doc.data().doanhso[0].year;
            for (let i = 0; i <= dataDoanhSo.length - 1; i++) {
              if (dataDoanhSo[i] !== null) {
                arr.push(dataDoanhSo[i]);
              }
            }
            days = doc.data().staffDateOfBirth;
            data.push({
              ten: doc.data().fullName,
              ava: doc.data().avatars[0].publicUrl,
              email: doc.data().email,
              sdt: doc.data().phoneNumber,
              doanhso: [arr[arr.length - 1]],
            });
          }
          this.setState({
            data: data,
            loading: false,
            ngaysinh: days,
          });
        });
      });
    const {navigation} = this.props;
    const sinhnhat = navigation.getParam('birth', 'chưa có dữ liệu');
    const birthday = navigation.getParam('birthday', 'chua co du lieu');

    let day = moment().format('DD-MM');
    if (sinhnhat !== 'chưa có dữ liệu') {
      let index2 = sinhnhat.findIndex(dayS => dayS === day);
      if (index2 !== -1) {
        firebaseApp
          .firestore()
          .collection('user')
          .onSnapshot(querySnapshot => {
            var name = [];
            querySnapshot.forEach(doc => {
              if (doc.data().staffDateOfBirth.slice(0, 5) === day) {
                doc.data().staffDateOfBirth.slice(0, 5);

                name.push({
                  nameBD: doc.data().fullName,
                });
              }
            });
            this.setState({nameBirth: name});
          });
        this.setState({
          dialogVisible: true,
        });
      }
    }
    if (birthday !== 'chua co du lieu') {
      let index = birthday.findIndex(dayS => dayS === day);
      if (index !== -1) {
        firebaseApp
          .firestore()
          .collection('user')
          .onSnapshot(querySnapshot => {
            var name = [];
            querySnapshot.forEach(doc => {
              if (doc.data().staffDateOfBirth.slice(0, 5) === day) {
                doc.data().staffDateOfBirth.slice(0, 5);
                name.push({
                  nameBD: doc.data().fullName,
                  id: doc.id,
                });
              }
            });
            this.setState({nameBirth: name});
          });
        this.setState({
          dialogVisible: true,
        });
      }
    }

    // Enable playback in silence mode
    Sound.setCategory('Playback');

    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    var whoosh = new Sound('sinhnhat.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      //   console.log(
      //     'duration in seconds: ' +
      //       whoosh.getDuration() +
      //       'number of channels: ' +
      //       whoosh.getNumberOfChannels(),
      //   );

      // Play the sound with an onEnd callback
      if (this.state.dialogVisible === true) {
        whoosh.play();
      }
    });

    // Reduce the volume by half
    whoosh.setVolume(0.5);

    // Position the sound to the full right in a stereo field
    whoosh.setPan(1);

    // Loop indefinitely until stop() is called
    whoosh.setNumberOfLoops(-1);

    this.setState({stop: whoosh});
    whoosh.pause();
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
          <Dialog
            visible={this.state.dialogVisible}
            title="Chúc Mừng Sinh Nhật"
            animationType="slide"
            titleStyle={{
              color: 'rgba(240, 36, 63, 0.65)',
              fontSize: 25,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 5,
            }}
            overlayStyle={{backgroundColor: 'rgba(0,0,0,.1)'}}
            dialogStyle={{
              borderRadius: 20,
              backgroundColor: 'rgba(180, 191, 233, 0.9)',
            }}
            onTouchOutside={() => {
              this.setState({dialogVisible: false});
              this.state.stop.pause();
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                source={require('../../img/birthday.gif')}
                borderRadius={20}
                resizeMode="cover"
                style={{
                  width: 200,
                  height: 150,
                  marginBottom: 10,
                }}
              />
              {this.renderStaffName()}
              <TouchableOpacity
                onPress={() => {
                  this.setState({dialogVisible: false});
                  this.state.stop.pause();
                }}
                style={{
                  borderRadius: 45,
                  justifyContent: 'center',
                  backgroundColor: '#1085B8',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Text style={{padding: 10}}>Chúc Mừng !!!</Text>
              </TouchableOpacity>
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
                          phong: this.state.phong,
                          email: item.email,
                          nhom: this.state.team,
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
              <Text style={styles.menuTitleTxt}>Báo cáo - Thống kê</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.menuItem}
            onPress={() => {
              this.props.navigation.navigate('BarChartScreen');
            }}>
            <View style={styles.menuIcon}>
              <View style={styles.menuIconCircle}>
                <Image
                  source={require('../../img/trip.png')}
                  style={styles.menuImg}
                />
              </View>
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
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 20,
  },
  menuIconCircle: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 100,
  },
  menuImg: {
    height: 70,
    width: 70,
  },
  menuTitleTxt: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: RFValue(15, 680),
    // fontSize: RFPercentage(2),
    textAlign: 'center',
  },
});
