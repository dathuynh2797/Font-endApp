/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import 'firebase/firestore';
import {HeaderLeft, HeaderRight, Title} from '../CustomHeader';
import bgAva from '../../img/bgAva.png';
import {firebaseApp} from '../config';

export class userDetail extends Component {
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
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerTitle: () => <Title title="Hồ sơ cá nhân" />,
      headerRight: () => <HeaderRight navigation={navigation} />,
    };
  };
  componentDidMount() {
    const {navigation} = this.props;
    const nhom = navigation.getParam('nhom', 'chưa có dữ liệu');
    const phong = navigation.getParam('phong', 'chưa có dữ liệu');
    console.log(nhom);
    var tennhom = '';
    var tenphong = '';
    firebaseApp
      .firestore()
      .collection('stall')
      .onSnapshot(querySnapshot1 => {
        querySnapshot1.forEach(doc1 => {
          if (nhom === doc1.data().id) {
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
          if (phong === doc1.data().id) {
            tenphong = doc1.data().unitsTitle;
          }
        });
        this.setState({phong: tenphong});
      });
  }
  render() {
    const {navigation} = this.props;
    const namsinh = navigation.getParam('namsinh', 'chưa có dữ liệu');
    const ten = navigation.getParam('ten');
    const sdt = navigation.getParam('sdt');
    const email = navigation.getParam('email', 'chưa có dữ liệu');
    const hinhanh = navigation.getParam('hinhanh', 'chưa có dữ liệu');
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1 / 3}}>
          <ImageBackground style={styles.Top} source={bgAva}>
            <Image
              source={{
                uri: hinhanh,
              }}
              style={styles.AvatarImg}
            />
            <Text style={styles.AvatarTxt}>{ten}</Text>
          </ImageBackground>
        </View>
        <View style={styles.Content}>
          <View style={styles.Item}>
            <Image source={require('../..//img/Profile/birthday.png')} />
            <View style={styles.HorizonLine} />
            <Text>Sinh nhật: {namsinh}</Text>
          </View>
          <View style={styles.Item}>
            <Image source={require('../../img/Profile/phone.png')} />
            <View style={styles.HorizonLine} />
            <Text>Số điện thoại: {sdt}</Text>
          </View>
          <View style={styles.Item}>
            <Image source={require('../../img/Profile/mail.png')} />
            <View style={styles.HorizonLine} />
            <Text>Email: {email}</Text>
          </View>
          <View style={styles.Item}>
            <Image source={require('../../img/Profile/team.png')} />
            <View style={styles.HorizonLine} />
            <Text>Nhóm: {this.state.team}</Text>
          </View>
          <View style={styles.Item}>
            <Image source={require('../../img/Profile/department.png')} />
            <View style={styles.HorizonLine} />
            <Text>Phòng: {this.state.phong}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ChangePassword');
            }}
            style={styles.Item}>
            <Image source={require('../../img/lock.png')} />
            <View style={styles.HorizonLine} />
            <Text>Đổi mật Khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Top: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AvatarImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  AvatarTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  Content: {
    flex: 2 / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Item: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    borderRadius: 4,
    padding: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  HorizonLine: {
    borderWidth: 1,
    height: '100%',
    marginHorizontal: 10,
  },
});
