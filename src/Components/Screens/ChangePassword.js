import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {firebaseApp} from '../config';
import * as firebase from 'firebase';
const {width: WIDTH} = Dimensions.get('window');
import bgImage from '../../img/bgLogin.jpg';
import {EMAIL, PASSWORD} from '../Regex';
export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      passwordOldValid: true,
      passwordNewValid: true,
      loginBtn: false,
    };
  }
  validate(type, value) {
    if (type === 'currentPassword') {
      this.setState({currentPassword: value});
      if (value === '' || PASSWORD.test(value)) {
        this.setState({currentPassword: true});
        this.setState({loginBtn: false});
      } else {
        this.setState({passwordOldValid: false});
        this.setState({loginBtn: true});
      }
    } else if (type === 'newPassword') {
      this.setState({newPassword: value});
      if (value === '' || PASSWORD.test(value)) {
        this.setState({passwordNewValid: true});
        this.setState({loginBtn: true});
      } else {
        this.setState({passwordNewValid: false});
        this.setState({loginBtn: true});
      }
    }
  }
  reAuthenticate = currentPassword => {
    var user = firebaseApp.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    return user.reauthenticateWithCredential(cred);
  };

  onChangePassword = () => {
    this.reAuthenticate(this.state.currentPassword)
      .then(() => {
        var user = firebaseApp.auth().currentUser;
        user
          .updatePassword(this.state.newPassword)
          .then(() => {
            Alert.alert('Password was change');
          })
          .catch(error => {
            Alert.alert(error.message);
          });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.ImageBackground}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Đổi Mật Khẩu</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.textInput,
                !this.state.passwordOldValid ? styles.error : null,
              ]}
              placeholder="Mật Khẩu Hiện Tại"
              value={this.state.currentPassword}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={text => {
                this.validate('currentPassword', text);
              }}
            />
            <TextInput
              style={[
                styles.textInput,
                !this.state.passwordNewValid ? styles.error : null,
              ]}
              placeholder="Mật Khẩu Mới"
              value={this.state.newPassword}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={text => {
                this.validate('newPassword', text);
              }}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              disabled={this.state.loginBtn}
              onPress={this.onChangePassword}
              style={styles.btnChangePass}>
              <Text>Thay đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.btnChangePass1}>
              <Text>Quay về</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    // paddingVertical: 50,
    // paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: 20,
    // justifyContent: 'center',
  },
  textInput: {
    width: WIDTH - 80,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,

    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 40,
    // alignSelf: 'stretch',
    fontSize: 18,
    borderRadius: 30,
  },
  logoContainer: {marginTop: 20},
  logoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 35,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#2D389C',
  },

  btnChangePass: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#1085B8',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 130,
  },
  btnChangePass1: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#D0B369',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 130,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  error: {
    borderWidth: 2,
    borderColor: 'red',
  },
});
