/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import 'firebase/firestore';
import {HeaderLeft, HeaderRight, Title} from '../CustomHeader';
import bgAva from '../../img/bgAva.png';
import {firebaseApp} from '../config';
const windowHeight = Dimensions.get('window').height;
const height = (windowHeight - (windowHeight * 87) / 100) / 10;
export class PersonalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenphong: '',
      tennhom: '',
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    const idphong = navigation.getParam('idphong', 'chưa có dữ liệu');
    const idnhom = navigation.getParam('idnhom', 'chưa có dữ liệu');
    var tenphong = '';
    var tennhom = '';
    firebaseApp
      .firestore()
      .collection('units')
      .onSnapshot(query => {
        query.forEach(doc1 => {
          if (idphong === doc1.data().id) {
            tenphong = doc1.data().unitsTitle;
          }
        });
        this.setState({tenphong: tenphong});
      });
    firebaseApp
      .firestore()
      .collection('stall')
      .onSnapshot(querySnapshot1 => {
        querySnapshot1.forEach(doc2 => {
          if (idnhom === doc2.data().id) {
            tennhom = doc2.data().teamName;
          }
        });
        this.setState({tennhom: tennhom});
      });
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerTitle: () => <Title title="Hồ sơ cá nhân" />,
      headerRight: () => <HeaderRight navigation={navigation} />,
    };
  };
  render() {
    const {navigation} = this.props;
    const namsinh = navigation.getParam('namsinh', 'chưa có dữ liệu');
    const ten = navigation.getParam('ten');
    const sdt = navigation.getParam('sdt');
    const email = navigation.getParam('email', 'chưa có dữ liệu');
    const hinhanh = navigation.getParam('hinhanh', 'chưa có dữ liệu');
    // const nhom = navigation.getParam('nhom', 'chưa có dữ liệu');
    // const phong = navigation.getParam('phong', 'chưa có dữ liệu');
    const role = navigation.getParam('chucvu', 'chưa có dữ liệu');
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
            <Text>Nhóm: {this.state.tennhom}</Text>
          </View>

          <View style={styles.Item}>
            <Image source={require('../../img/Profile/department.png')} />
            <View style={styles.HorizonLine} />
            <Text>Phòng: {this.state.tenphong}</Text>
          </View>

          <View style={styles.Item}>
            <Image source={require('../../img/Profile/mail.png')} />
            <View style={styles.HorizonLine} />
            <Text>Chức vụ: {role}</Text>
          </View>
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
    width: 160,
    height: 160,
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
    padding: height,
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
