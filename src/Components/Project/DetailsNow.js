import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Header} from '../../Components/CustomHeader';

export class DetailsNow extends Component {
  static navigationOption = {
    header: null,
  };
  render() {
    const {navigation} = this.props;
    const ten = navigation.getParam('ten', 'chưa có dữ liệu');
    const hinhanhtq = navigation.getParam('hinhanhtq', 'chưa có dữ liệu');
    const latitude = navigation.getParam('latitude', 'chưa có dữ liệu');
    const longtitude = navigation.getParam('longtitude', 'chưa có dữ liệu');
    return (
      <SafeAreaView style={styles.MenuContainer}>
        <Header title={ten} navigation={navigation} />
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Tq', {hinhanhtq});
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.Iconstyle}>
                <Image
                  source={require('../../img/Inforicon/policy.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>Tổng quan</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Pl');
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.Iconstyle}>
                <Image
                  source={require('../../img/Inforicon/policy.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>Pháp lý</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Bg');
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.Iconstyle}>
                <Image
                  source={require('../../img/Inforicon/policy.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>Bảng giá</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Csbhnv');
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.Iconstyle}>
                <Image
                  source={require('../../img/Inforicon/policy.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>CSBH dành cho nhân viên</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Csbhkh');
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.Iconstyle}>
                <Image
                  source={require('../../img/Inforicon/policy.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>CSBH dành cho khách hàng</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Qc');
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.Iconstyle}>
                <Image
                  source={require('../../img/Inforicon/policy.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>Quảng cáo</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('location', {
                latitude: latitude,
                longtitude: longtitude,
              });
            }}>
            <View style={styles.TabMenu}>
              <View style={styles.Iconstyle}>
                <Image
                  source={require('../../img/Inforicon/policy.png')}
                  style={styles.Icon}
                />
              </View>
              <Text style={styles.Text}>Vị trí</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MenuContainer: {
    flex: 1,
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  Iconstyle: {
    justifyContent: 'space-around',
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
