import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import {firebaseApp} from './config';
const {width: WIDTH} = Dimensions.get('window');
export class Tq extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'XEM THÔNG TIN',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate({routeName: 'HomeScreen'})}>
          <Image source={require('../img/exit.png')} style={styles.iconBack} />
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
    const hinhanhtq = navigation.getParam('hinhanhtq', 'chưa có dữ liệu');
    return (
      <View>
        <Text style={styles.headerText}>Tổng quan</Text>
        <Image
          source={{
            uri: hinhanhtq,
          }}
          style={styles.Proflie}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Proflie: {
    width: 395,
    height: 550,
    // resizeMode: 'contain',
    alignItems: 'center',
    marginTop: 30,
  },
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
});
