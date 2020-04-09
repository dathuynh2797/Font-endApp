import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {firebaseApp} from '../config';

export class Ogchart extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'SƠ ĐỒ TỔ CHỨC',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate({routeName: 'HomeSrceen'})}>
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
  componentDidMount() {
    firebaseApp
      .database()
      .ref('thongtinnhanvien')
      .child('tennv')
      .on('value', dataSnapshot => {
        var data = [];
        dataSnapshot.forEach(doc => {
          data.push({
            key: doc.key,
            name: doc.val(),
          });
          this.setState({
            data: data,
            // loading: false,
          });
        });
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.body}>
        <SafeAreaView style={styles.Imgview}>
          <View style={styles.Chart}>
            <Image
              source={require('../../img/4a4d35e88fc1749f2dd0.jpg')}
              style={styles.Imgview1}
            />
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.MenuContainer}>
          <View style={styles.Col}>
            <TouchableOpacity>
              <View style={styles.TabMenu}>
                <Text style={styles.Text}>BAN GIÁM ĐỐC</Text>
                <Text>3 nhân sự</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Col}>
            <TouchableOpacity>
              <View style={styles.TabMenu}>
                <Text style={styles.Text}>PHÒNG KINH DOANH</Text>
                <Text>50 nhân sự</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Col}>
            <TouchableOpacity>
              <View style={styles.TabMenu}>
                <Text style={styles.Text}>PHÒNG TÀI CHÍNH</Text>
                <Text>4 nhân sự</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Col}>
            <TouchableOpacity>
              <View style={styles.TabMenu}>
                <Text style={styles.Text}>PHÒNG NHÂN SỰ</Text>
                <Text>4 nhân sự</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  Imgview: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 300,
    // height: 50,
    // marginLeft: 45,
  },
  Imgview1: {
    // flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 333,
    height: 168,
    // marginLeft: 45,
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  Chart: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 170,
    width: 329,
    borderWidth: 1,
    backgroundColor: 'grey',
  },
  MenuContainer: {
    flex: 2 / 3,
    //justifyContent: 'center',
    //flexDirection: 'column',
    //alignItems: 'center',
    //backgroundColor: 'grey',
  },
  Col: {
    //flex: 1,
    //flexDirection: 'row',
    height: 70,
    margin: 1,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#1787AB',
    justifyContent: 'center',
  },
  TabMenu: {
    //justifyContent: 'space-between',
    //flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Iconstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    height: 50,
    width: 50,
    backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 1,
  },
  Icon: {
    height: 50,
    width: 50,
  },
  Text: {
    color: 'white',
    fontStyle: 'normal',
    // fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 20,
    lineHeight: 23,
    alignSelf: 'center',
  },
  btnGo: {
    //color: 'white',
    fontSize: 18,
  },
});
