/* eslint-disable react-native/no-inline-styles */
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
import {firebaseApp} from '../Components/config';
import bgImage from '../img/bgLogin.jpg';
import {RFValue} from 'react-native-responsive-fontsize';
import {DismissKeyboardView} from './DismissKeyBroad';

const {width: WIDTH} = Dimensions.get('window');

export class ForgotPassword extends React.Component {
  state = {email: ''};
  handlePasswordReset = () => {
    const {email} = this.state;
    firebaseApp
      .auth()
      .sendPasswordResetEmail(email)
      .then(function(user) {
        Alert.alert('Vui lòng kiểm tra Email');
      })
      .catch(function(error) {
        var errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          Alert.alert(
            '',
            'Vui lòng nhập đúng định dạng Email',
            [{text: 'OK', onPress: () => console.log('OK pressed')}],
            {cancelable: false},
          );
        }
        if (errorCode === 'auth/user-not-found') {
          Alert.alert(
            '',
            'Không tìm thấy Email trùng khớp',
            [{text: 'OK', onPress: () => console.log('OK pressed')}],
            {cancelable: false},
          );
        }
      });
  };
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.ImageBackground}>
        <DismissKeyboardView>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View style={styles.logoContainer}>
              <Image style={styles.logo} source={require('../img/LOGO.png')} />
            </View>

            <View>
              <Text style={styles.headerText}>Quên Mật Khẩu</Text>
            </View>

            <View style={styles.input}>
              <TextInput
                name="email"
                placeholder="Nhập email"
                value={this.state.email}
                onChangeText={email => this.setState({email})}
                autoCapitalize="none"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                onPress={this.handlePasswordReset}
                style={styles.btnLogin}>
                <Text style={styles.text}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.text}>Quay về</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </DismissKeyboardView>
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
  },
  logoText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    // opacity: 0.5,
  },
  logo: {
    width: 160,
    height: 160,
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
    width: WIDTH - 60,
    height: 50,
    borderRadius: 50,
    fontSize: 16,
    paddingLeft: 50,
    backgroundColor: 'rgb(197, 218, 250)',
    color: 'black',
    marginHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    justifyContent: 'center',
    // elevation: 15,
    marginVertical: 10,
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
    width: WIDTH - 265,
    height: 50,
    borderRadius: 45,
    justifyContent: 'center',
    backgroundColor: '#1085B8',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#1085B8',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    alignItems: 'center',
  },
  btnCancel: {
    width: WIDTH - 265,
    height: 50,
    borderRadius: 45,
    justifyContent: 'center',
    backgroundColor: '#D0B369',
    marginBottom: 20,
    shadowColor: '#1085B8',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    marginTop: 10,
    shadowRadius: 9.51,
    elevation: 15,
    alignItems: 'center',
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: RFValue(13, 680),
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
