import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {firebaseApp} from '../config';
import * as firebase from 'firebase';
export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
    };
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
        var user = firebase.auth().currentUser;
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
      <View style={styles.Container}>
        <TextInput
          style={styles.textInput}
          placeholder="Current Password"
          value={this.state.currentPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={text => {
            this.setState({currentPassword: text});
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="New Password"
          value={this.state.newPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={text => {
            this.setState({newPassword: text});
          }}
        />
        <TouchableOpacity
          onPress={this.onChangePassword}
          style={styles.btnChangePass}>
          <Text>Change Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 20,
    padding: 10,
    height: 40,
    alignSelf: 'stretch',
    fontSize: 18,
  },
  btnChangePass: {
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 100,
  },
});
