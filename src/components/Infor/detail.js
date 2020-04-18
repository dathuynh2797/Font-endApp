/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import 'firebase/firestore';
const {width: WIDTH} = Dimensions.get('window');

export class detail extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'THÔNG TIN CHI TIẾT',
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
  render() {
    const {navigation} = this.props;
    const namsinh = navigation.getParam('namsinh', 'chưa có dữ liệu');
    const ten = navigation.getParam('ten');
    const sdt = navigation.getParam('sdt');
    const email = navigation.getParam('email', 'chưa có dữ liệu');
    const hinhanh = navigation.getParam('hinhanh', 'chưa có dữ liệu');
    const nhom = navigation.getParam('nhom', 'chưa có dữ liệu');
    const phong = navigation.getParam('phong', 'chưa có dữ liệu');
    return (
      <View>
        <Image
          source={{
            uri: hinhanh,
          }}
          style={{
            marginLeft: 10,
            alignItems: 'center',
            width: 150,
            height: 150,
          }}
        />
        <Text>Họ tên: {ten}</Text>
        <Text>Sinh nhật: {namsinh}</Text>
        <Text>Số điện thoại: {sdt}</Text>
        <Text>Email: {email}</Text>
        <Text>Nhóm: {nhom}</Text>
        <Text>Phòng: {phong}</Text>
        {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Tq', {
              hinhanh: hinhanh,
            });
          }}>
          <View style={styles.TabMenu}>
            <View style={styles.Iconstyle}>
              <Image
                source={{
                  uri: hinhanh,
                }}
                style={styles.Icon}
              />
            </View>
            <Text style={styles.Text}>Tổng quan</Text>
            <Text />
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: 'white'},
  head: {height: 40, backgroundColor: '#f1f8ff', borderWidth: 1.5},
  text: {margin: 10},
  headerText: {
    width: WIDTH - 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 35,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#2D389C',
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  ngang: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1.5,
  },
});
