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
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {firebaseApp} from './config';
import bgImage from '../img/bgLogin.png';
import eye from '../img/eye.png';
import eyeOff from '../img/eye-off.png';
import {EMAIL, PASSWORD} from './Regex';

const {width: WIDTH} = Dimensions.get('window');

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      emailValid: true,
      passwordValid: true,
      loginBtn: false,
      showPass: false,
    };
  }

  showPass = () => {
    if (this.state.press === false) {
      this.setState({showPass: false, press: true});
    } else {
      this.setState({showPass: true, press: false});
    }
  };

  validate(type, value) {
    if (type === 'email') {
      this.setState({email: value});
      if (value === '' || EMAIL.test(value)) {
        this.setState({emailValid: true});
        this.setState({loginBtn: false});
      } else {
        this.setState({emailValid: false});
        this.setState({loginBtn: true});
      }
    } else if (type === 'password') {
      this.setState({password: value});
      if (value === '' || PASSWORD.test(value)) {
        this.setState({passwordValid: true});
        this.setState({loginBtn: false});
      } else {
        this.setState({passwordValid: false});
        this.setState({loginBtn: true});
      }
    }
  }

  _login() {
    if (
      this.state.emailValid &&
      this.state.passwordValid &&
      this.state.email !== '' &&
      this.state.password !== ''
    ) {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          const navigate = this.props.navigation;
          navigate('HomeScreen');
        })
        .catch(function(error) {
          var errorCode = error.code;
          if (errorCode === 'auth/user-not-found') {
            Alert.alert(
              'Login fail',
              'email invalid',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                {text: 'OK', onPress: () => console.log('OK pressed')},
              ],
              {cancelable: false},
            );
          } else if (errorCode === 'auth/wrong-password') {
            Alert.alert(
              'Login fail',
              'password invalid',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                {text: 'OK', onPress: () => console.log('OK pressed')},
              ],
              {cancelable: false},
            );
          }
        });
    } else {
      if (this.state.email === '' || this.state.password === '') {
        Alert.alert(
          'Login',
          'Please enter email and password',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
            },
            {text: 'OK', onPress: () => console.log('OK pressed')},
          ],
          {cancelable: false},
        );
      }
    }
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.ImageBackground}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
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
            <View style={styles.inputIcon}>
              <Image source={require('../img/user.png')} />
            </View>
            <TextInput
              style={[
                styles.input,
                !this.state.emailValid ? styles.error : null,
              ]}
              placeholder="Tên Đăng Nhập"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={email => {
                this.validate('email', email);
              }}
              placeholderTextColor={'rgba(0 , 0 , 0 , 0.5)'}
              underlineColorAndroid="transparent"
              value={this.state.email}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Image source={require('../img/lock.png')} />
            </View>
            <TextInput
              style={[
                styles.input,
                !this.state.passwordValid ? styles.error : null,
              ]}
              placeholder="Mật Khẩu"
              autoCapitalize="none"
              secureTextEntry={this.state.showPass}
              onChangeText={password => {
                this.validate('password', password);
              }}
              placeholderTextColor={'rgba(0 , 0 , 0 , 0.5)'}
              underlineColorAndroid="transparent"
              value={this.state.password}
            />
            <TouchableOpacity style={styles.btnEye} onPress={this.showPass}>
              <Image
                style={styles.iconEye}
                source={this.state.press === false ? eye : eyeOff}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={this.state.loginBtn}
            style={styles.btnLogin}
            onPress={() => {
              this._login();
            }}>
            <Text style={styles.text}>Đăng Nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ForgotScreen');
            }}>
            <Text>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  logoText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    // opacity: 0.5,
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
    // justifyContent: 'center',
  },
  input: {
    width: WIDTH - 100,
    height: 50,
    borderRadius: 50,
    fontSize: 16,
    paddingLeft: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: 'black',
    marginHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  inputIcon: {
    position: 'absolute',
    top: 7,
    left: 37,
  },
  btnEye: {
    position: 'absolute',
    top: 15,
    right: 40,
  },
  iconEye: {
    height: 20,
    width: 20,
  },
  btnLogin: {
    width: WIDTH - 270,
    height: 50,
    borderRadius: 45,
    justifyContent: 'center',
    backgroundColor: '#1085B8',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#1085B8',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  text: {
    color: '#E5E5E5',
    textAlign: 'center',
    fontSize: 16,
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
