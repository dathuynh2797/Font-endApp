import React from 'react';
import 'react-native-gesture-handler';
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
import {firebaseApp} from './config';
import bgImage from '../img/bgLogin.png';
// import Icon from 'react-native-vector-icons/Ionicons';

const {width: WIDTH} = Dimensions.get('window');

export class LoginScreen extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleLogin = () => {
    const {email, password} = this.state;
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('HomeScreen'))
      .catch(error =>
        this.setState({
          errorMessage: 'Tên đăng nhập hoặc mật khẩu sai, vui lòng nhập lại',
        }),
      );
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
            Ứng dụng quản lý công ty bất động sản
          </Text>
        </View>
        {this.state.errorMessage && <Text>{this.state.errorMessage}</Text>}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tên Đăng Nhập"
            autoCapitalize="none"
            onChangeText={email => this.setState({email})}
            placeholderTextColor={'rgba(0 , 0 , 0 , 0.5)'}
            underlineColorAndroid="transparent"
            value={this.state.email}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mật Khẩu"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={password => this.setState({password})}
            placeholderTextColor={'rgba(0 , 0 , 0 , 0.5)'}
            underlineColorAndroid="transparent"
            value={this.state.password}
          />
        </View>
        <TouchableOpacity style={styles.btnLogin} onPress={this.handleLogin}>
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
