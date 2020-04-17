import React from 'react';
import 'react-native-gesture-handler';
import {Alert, BackHandler} from 'react-native';
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
          errorMessage:
            'Tên đăng nhập hoặc mật khẩu không đúng, xin kiểm tra lại',
        }),
      );
  };
  constructor(props) {
    super(props);
  }
  //xu ly phim back android

  // componentWillUnmount() {
  //   this.backHandler.remove();
  // }
  //
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
              style={styles.input}
              placeholder="Tên Đăng Nhập"
              keyboardType="email-address"
              autoCapitalize="none"
              iconName="ios-mail"
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
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ForgotPassword');
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
