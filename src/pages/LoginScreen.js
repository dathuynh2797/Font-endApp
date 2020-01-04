import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import bgImage from '../img/bgLogin.png';
// import Icon from 'react-native-vector-icons/Ionicons';

const {width: WIDTH} = Dimensions.get('window');

export class LoginScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
    };
  };

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.ImageBackground}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} />
          <Text style={styles.logoText}>Logo</Text>
        </View>

        <View>
          <Text style={styles.headerText}>
            {' '}
            Ứng dụng quản lý công ty bất động sản
          </Text>
        </View>

        <View style={styles.inputContainer}>
          {/* <Icon
            name={'ios-person'}
            size={28}
            color={'rgba(255 , 255 , 255 , 0.7)'}
            style={styles.inputIcon}
          /> */}
          <TextInput
            style={styles.input}
            placeholder="Tên Đăng Nhập"
            placeholderTextColor={'rgba(0 , 0 , 0 , 0.5)'}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputContainer}>
          {/* <Icon
            name={'ios-lock'}
            size={28}
            color={'rgba(255 , 255 , 255 , 0.7)'}
            style={styles.inputIcon}
          /> */}
          <TextInput
            style={styles.input}
            placeholder="Mật Khẩu"
            secureTextEntry={true}
            placeholderTextColor={'rgba(0 , 0 , 0 , 0.5)'}
            underlineColorAndroid="transparent"
          />
        </View>
        <TouchableOpacity
          style={styles.btnLogin}
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}>
          <Text style={styles.text}>Đăng Nhập</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'white',
  },
  logoText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    //opacity: 0.5,
  },
  logo: {
    width: 238,
    height: 98,
  },
  headerText: {
    width: WIDTH - 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 35,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#2D389C',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    width: WIDTH - 100,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: '#FFFEFE',
    color: 'black',
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37,
  },
  btnLogin: {
    width: WIDTH - 270,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    backgroundColor: '#1085B8',
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    color: '#E5E5E5',
    textAlign: 'center',
    fontSize: 16,
  },
});
