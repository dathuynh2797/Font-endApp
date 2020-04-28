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
  Dimensions,
} from 'react-native';
import bgImage from '../img/bgprofile.png';
import {firebaseApp} from './config';

const {width: W, height: H} = Dimensions.get('window');

export class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      avatar: [],
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
          });
          this.setState({
            avatar: marker1,
            loading: false,
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
      <SafeAreaView style={styles.body}>
        <ImageBackground style={styles.Profile} source={bgImage}>
          <TouchableOpacity
            style={styles.btnLogOut}
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
          <FlatList
            data={this.state.avatar}
            renderItem={({item}) => (
              <View>
                <Text style={styles.TxtAvatar}>Xin chào: {item.ten}</Text>
                <TouchableOpacity
                  style={styles.Ava}
                  onPress={() => {
                    this.props.navigation.navigate('detail', {
                      id: item.id,
                      ten: item.ten,
                      sdt: item.sdt,
                      namsinh: item.namsinh,
                      hinhanh: item.ava,
                      email: item.email,
                    });
                  }}>
                  <Image style={styles.Avatar} source={{uri: item.ava}} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item => item.ten, item => item.ava)}
          />
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
                this.props.navigation.navigate('Project');
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
            <TouchableOpacity
              style={styles.Row}
              onPress={() => {
                this.props.navigation.navigate('baocao');
              }}>
              <View style={styles.BtnStyle}>
                <Image
                  source={require('../img/chart.png')}
                  style={styles.Icon}
                />
              </View>
              <View>
                <Text style={styles.Text}>Báo cáo - Thống kê</Text>
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
  Profile: {
    flex: 1 / 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnLogOut: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 15,
  },
  Ava: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Avatar: {
    resizeMode: 'stretch',
    height: 150,
    width: 150,
    borderRadius: 100,
    borderWidth: 1,
    marginTop: 20,
  },
  TxtAvatar: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: 0.01,
    textAlign: 'center',
    padding: 8,
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
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'center',
    padding: 5,
  },
});
