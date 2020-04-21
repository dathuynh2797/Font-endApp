import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {Platform} from 'react-native';
import {firebaseApp} from './config';
import bgImage from '../img/bgLogin.png';
const {width: WIDTH} = Dimensions.get('window');
export class Loading extends Component {
  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('HomeScreen');
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
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
            <View style={styles.loading}>
              <Text>Đang tải</Text>
              <ActivityIndicator size="large" />
            </View>
          </View>
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
  loading: {
    fontSize: 15,
    padding: 10,
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
});
