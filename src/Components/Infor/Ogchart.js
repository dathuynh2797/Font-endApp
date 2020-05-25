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
      lengthbgd: [],
      lengthpkd: [],
      lengthptc: [],
      lengthpns: [],
      image: '',
    };
  }
  componentDidMount() {
    const abc = firebaseApp.firestore();
    abc
      .collection('user')
      .where('productVariation.label', '==', 'Ban Giám Đốc')
      .onSnapshot(querySnapshot => {
        var bgd = [];
        querySnapshot.forEach(doc => {
          bgd.push({});
          bgd.length;
          this.setState({
            lengthbgd: bgd,
          });
        });
      });
    abc
      .collection('user')
      .where('productVariation.label', '==', 'Phòng kinh doanh')
      .onSnapshot(querySnapshot => {
        var pkd = [];
        querySnapshot.forEach(doc => {
          pkd.push({});
          pkd.length;
          this.setState({
            lengthpkd: pkd,
          });
        });
      });
    abc
      .collection('user')
      .where('productVariation.label', '==', 'Phòng nhân sự')
      .onSnapshot(querySnapshot => {
        var pns = [];
        querySnapshot.forEach(doc => {
          pns.push({});
          pns.length;
          this.setState({
            lengthpns: pns,
          });
        });
      });
    abc
      .collection('user')
      .where('productVariation.label', '==', 'Phòng tài chính')
      .onSnapshot(querySnapshot => {
        var ptc = [];
        querySnapshot.forEach(doc => {
          ptc.push({});
          ptc.length;
          this.setState({
            lengthptc: ptc,
          });
        });
      });
    abc.collection('brands').onSnapshot(querySnapshot => {
      var hinhanh = '';
      querySnapshot.forEach(doc => {
        hinhanh = doc.data().brandCover[0].publicUrl;
      });
      this.setState({
        image: hinhanh,
      });
    });
  }
  render() {
    let {image} = this.state;
    return (
      <SafeAreaView style={styles.body}>
        <SafeAreaView style={styles.Imgview}>
          <View style={styles.Chart}>
            <Image source={{uri: image}} style={styles.Imgview1} />
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
                <Text>{this.state.lengthbgd.length} nhân sự</Text>
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
                <Text>{this.state.lengthpkd.length} nhân sự</Text>
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
                <Text>{this.state.lengthptc.length} nhân sự</Text>
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
                <Text>{this.state.lengthpns.length} nhân sự</Text>
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
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
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
