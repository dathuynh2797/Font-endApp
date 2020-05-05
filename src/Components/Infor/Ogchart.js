import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {firebaseApp} from '../config';

export class Ogchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dodai: [],
    };
  }
  componentDidMount() {
    const abc = firebaseApp.firestore();
    abc.collection('staff').onSnapshot(querySnapshot => {
      var dodai1 = [];
      querySnapshot.forEach(doc => {
        dodai1.push({});
        dodai1.length;
        this.setState({
          dodai: dodai1,
        });
      });
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.body}>
        <SafeAreaView style={styles.Imgview}>
          <View style={styles.Chart}>
            <Image
              source={require('../../img/4a4d35e88fc1749f2dd0.jpg')}
              style={styles.Imgview1}
            />
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.MenuContainer}>
          <View style={styles.Col}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Ogchartbgd');
              }}>
              <View style={styles.TabMenu}>
                <Text style={styles.Text}>BAN GIÁM ĐỐC</Text>
                <Text>{this.state.dodai.length} nhân sự</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Col}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Ogchartpkd');
              }}>
              <View style={styles.TabMenu}>
                <Text style={styles.Text}>PHÒNG KINH DOANH</Text>
                <Text>{this.state.dodai.length} nhân sự</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Col}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Ogchartptc');
              }}>
              <View style={styles.TabMenu}>
                <Text style={styles.Text}>PHÒNG TÀI CHÍNH</Text>
                <Text>{this.state.dodai.length} nhân sự</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.Col}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Ogchartpns');
              }}>
              <View style={styles.TabMenu}>
                <Text style={styles.Text}>PHÒNG NHÂN SỰ</Text>
                <Text>{this.state.dodai.length} nhân sự</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  Imgview: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Imgview1: {
    resizeMode: 'cover',
    width: 333,
    height: 168,
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  Chart: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 170,
    width: 329,
    borderWidth: 1,
    backgroundColor: 'grey',
  },
  MenuContainer: {
    flex: 2 / 3,
  },
  Col: {
    height: 70,
    margin: 1,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#1787AB',
    justifyContent: 'center',
  },
  TabMenu: {
    flexWrap: 'wrap',
  },
  Iconstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    height: 50,
    width: 50,
    backgroundColor: 'white',
  },
  Icon: {
    height: 50,
    width: 50,
  },
  Text: {
    color: 'white',
    fontStyle: 'normal',
    // fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 20,
    lineHeight: 23,
    alignSelf: 'center',
  },
  btnGo: {
    //color: 'white',
    fontSize: 18,
  },
});
