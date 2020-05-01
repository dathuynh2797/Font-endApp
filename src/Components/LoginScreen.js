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
import {EMAIL, PASSWORD} from './Regex';

const {width: WIDTH} = Dimensions.get('window');

export class LoginScreen extends React.Component {
  //   state = {email: '', password: '', errorMessage: null};
  //   handleLogin = () => {
  //     const {email, password} = this.state;
  //     firebaseApp
  //       .auth()
  //       .signInWithEmailAndPassword(email, password)
  //       .then(() => this.props.navigation.navigate('HomeScreen'))
  //       .catch(error =>
  //         this.setState({
  //           errorMessage:
  //             'Tên đăng nhập hoặc mật khẩu không đúng, xin kiểm tra lại',
  //         }),
  //       );
  //   };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      emailValid: true,
      passwordValid: true,
    };
  }

  validate(type, value) {
    if (type === 'email') {
      this.setState({email: value});
      if (value === '' || EMAIL.test(value)) {
        this.setState({emailValid: true});
      } else {
        this.setState({emailValid: false});
      }
    } else if (type === 'password') {
      this.setState({password: value});
      if (value === '' || PASSWORD.test(value)) {
        this.setState({passwordValid: true});
      } else {
        this.setState({passwordValid: false});
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
          if (errorCode === 'auth/wrong-password') {
            Alert.alert(
              'Login fail',
              'email or password invalid',
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
            <TextInput
              style={[
                styles.input,
                !this.state.emailValid ? styles.error : null,
              ]}
              placeholder="Tên Đăng Nhập"
              keyboardType="email-address"
              autoCapitalize="none"
              iconName="ios-mail"
              onChangeText={email => {
                this.validate('email', email);
              }}
              placeholderTextColor={'rgba(0 , 0 , 0 , 0.5)'}
              underlineColorAndroid="transparent"
              value={this.state.email}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                !this.state.passwordValid ? styles.error : null,
              ]}
              placeholder="Mật Khẩu"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={password => {
                this.validate('password', password);
              }}
              placeholderTextColor={'rgba(0 , 0 , 0 , 0.5)'}
              underlineColorAndroid="transparent"
              value={this.state.password}
            />
          </View>
          <TouchableOpacity
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
    backgroundColor: 'rgba(255,255,255,0.5)',
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
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
