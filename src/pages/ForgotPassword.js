import {firebaseApp} from './config';
import React from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';

export class ForgotPassword extends React.Component {
  state = {email: ''};
  handlePasswordReset = () => {
    const {email} = this.state;
    firebaseApp
      .auth()
      .sendPasswordResetEmail(email)
      .then(function(user) {
        Alert.alert('Please check your email...');
      })
      .catch(function(e) {
        console.log(e);
      });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.text}>Quên mật khẩu?</Text>
        </View>
        <View
          initialValues={{email: ''}}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions);
          }}>
          <View>
            <TextInput
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
              autoCapitalize="none"
              iconName="ios-mail"
              iconColor="#2C384A"
            />
            <TouchableOpacity onPress={this.handlePasswordReset}>
              <Text style={styles.text}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 150,
  },
  text: {
    color: '#333',
    fontSize: 24,
    marginLeft: 25,
  },
  buttonContainer: {
    margin: 25,
  },
});
