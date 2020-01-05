import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import ElevatedView from 'react-native-elevated-view';
import bgImage from '../img/bgprofile.png';

export class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
    };
  };

  render() {
    return (
      <SafeAreaView style={styles.body}>
        <ImageBackground style={styles.Proflie} source={bgImage}>
          <Text style={styles.TxtAvatar}>Xin chào</Text>
          <View style={styles.Avatar}>
            <Text>Avatar</Text>
          </View>
          <Text style={styles.TxtAvatar}>VND: 500,000,000</Text>
        </ImageBackground>

        <SafeAreaView style={styles.MenuContainer}>
          <View style={styles.Col}>
            <View style={styles.Row}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Infor');
                }}>
                <ElevatedView elevation={24} style={styles.BtnStyle}>
                  <Image
                    source={require('../img/information.png')}
                    style={styles.Icon}
                  />
                </ElevatedView>
              </TouchableOpacity>
              <View>
                <Text style={styles.Text}>Thông Tin</Text>
              </View>
            </View>

            <View style={styles.Row}>
              <TouchableOpacity>
                <ElevatedView elevation={24} style={styles.BtnStyle}>
                  <Image
                    source={require('../img/project.png')}
                    style={styles.Icon}
                  />
                </ElevatedView>
              </TouchableOpacity>
              <View>
                <Text style={styles.Text}>Dự án bất động sản</Text>
              </View>
            </View>
          </View>
          <View style={styles.Col}>
            <View style={styles.Row}>
              <TouchableOpacity>
                <ElevatedView elevation={24} style={styles.BtnStyle}>
                  <Image
                    source={require('../img/chart.png')}
                    style={styles.Icon}
                  />
                </ElevatedView>
              </TouchableOpacity>

              <View>
                <Text style={styles.Text}>Báo cáo - thông kê</Text>
              </View>
            </View>
            <View style={styles.Row}>
              <View style={styles.BtnStyle}>
                <TouchableOpacity>
                  <ElevatedView elevation={24} style={styles.BtnStyle}>
                    <Image
                      source={require('../img/trip.png')}
                      style={styles.Icon}
                    />
                  </ElevatedView>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.Text}>Công tác</Text>
              </View>
            </View>
          </View>

          <View style={styles.Col}>
            <View style={styles.Row}>
              <TouchableOpacity>
                <ElevatedView elevation={24} style={styles.BtnStyle}>
                  <Image
                    source={require('../img/retired.png')}
                    style={styles.Icon}
                  />
                </ElevatedView>
              </TouchableOpacity>
              <View>
                <Text style={styles.Text}>Nghỉ Việc</Text>
              </View>
            </View>
            <View style={styles.Row} />
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
  Proflie: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
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
    //justifyContent: 'center',
    //flexDirection: 'column',
    //alignItems: 'center',
    //backgroundColor: 'grey',
  },
  Col: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    //borderBottomWidth: 1,
  },
  Row: {
    flex: 1,
    //borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    // fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 23,
  },
});
