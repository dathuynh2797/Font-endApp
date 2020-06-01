/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import {firebaseApp} from '../config';
import 'firebase/firestore';
import {Table, Row, Cols} from 'react-native-table-component';
import {Platform, InteractionManager} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
//set time out
const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}
export class Personel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tableHead: ['Tên', 'Năm sinh', 'Số điện thoại'],
      tableData: [],
      text: '',
      data: [],
      roles: '',
      tenphong: '',
      tennhom: '',
    };
  }
  compare() {
    const dataCompare = firebaseApp.firestore();
    dataCompare.collection('units').onSnapshot(querySnapshot => {
      var role = '';
      role = querySnapshot.data().id;
      this.setState({
        roles: role,
      });
    });
  }
  componentDidMount() {
    var name = [];
    var tenphong = '';
    var tennhom = '';
    firebaseApp
      .firestore()
      .collection('user')
      .where('disabled', '==', false)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          var idphong = doc.data().productUnit;
          var idteam = doc.data().iamTeam;
          firebaseApp
            .firestore()
            .collection('units')
            .onSnapshot(querySnapshot => {
              querySnapshot.forEach(doc => {
                if (idphong === doc.data().id) {
                  tenphong = doc.data().unitsTitle;
                }
              });
              this.setState({tenphong: tenphong});
            });
          firebaseApp
            .firestore()
            .collection('stall')
            .onSnapshot(querySnapshot => {
              querySnapshot.forEach(doc => {
                if (idteam === doc.data().id) {
                  tennhom = doc.data().teamName;
                }
              });
              this.setState({tennhom: tennhom});
            });
          name.push({
            id: doc.id,
            ten: doc.data().firstName,
            sdt: doc.data().phoneNumber,
            namsinh: doc.data().staffDateOfBirth,
            // hinhanh: doc.data().avatars[0].publicUrl,
            email: doc.data().email,
            chucvu: doc.data().roles[0],
          });

          this.setState({
            tableData: name.sort((a, b) => {
              return a.ten > b.ten;
            }),
            loading: true,
            data: name,
          });
        });
      });
  }
  filterSearch(text) {
    this.setState({
      value: text,
    });
    let newdata = this.state.data.filter(function(item) {
      let itemData = item.ten.toUpperCase();
      let textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      tableData: newdata,
    });
  }
  render() {
    return (
      <View>
        <Text style={styles.headerText}>Thông tin nhân viên</Text>
        <Image
          style={{
            position: 'absolute',
            height: 30,
            width: 30,
            top: 60,
            left: 30,
          }}
          source={require('../../img/Profile/seach.png')}
        />
        <View style={{paddingHorizontal: 20}}>
          <TextInput
            placeholder="Tìm kiếm"
            style={styles.seachbar}
            onChangeText={text => this.filterSearch(text)}
            value={this.state.value}
          />
        </View>
        <View style={styles.container}>
          <Table style={{maxHeight: '90%'}}>
            <Row
              data={this.state.tableHead}
              style={styles.head}
              textStyle={styles.text}
              borderStyle={{borderWidth: 1, borderColor: '#000'}}
              flexArr={[1.5, 1, 1]}
            />
            <FlatList
              data={this.state.tableData}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('PersonalDetail', {
                      id: item.id,
                      ten: item.ten,
                      sdt: item.sdt,
                      namsinh: item.namsinh,
                      hinhanh: item.hinhanh,
                      email: item.email,
                      chucvu: item.chucvu,
                      phong: this.state.tenphong,
                      nhom: this.state.tennhom,
                    });
                  }}>
                  <Cols
                    data={[[item.ten], [item.namsinh], [item.sdt]]}
                    textStyle={styles.text}
                    style={styles.boder}
                    borderStyle={{borderWidth: 1, borderColor: '#000'}}
                    flexArr={[1.5, 1, 1]}
                  />
                </TouchableOpacity>
              )}
            />
          </Table>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 5,
    backgroundColor: 'white',
  },
  head: {
    height: 40,
    backgroundColor: '#1787AB',
  },
  text: {
    margin: 10,
    // alignSelf: 'center',
  },
  headerText: {
    width: WIDTH - 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 35,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#2D389C',
    marginTop: 10,
    marginBottom: 10,
  },
  seachbar: {
    backgroundColor: 'rgba(78, 158, 237, 0.3)',
    borderRadius: 30,
    paddingLeft: 50,
    height: 40,
  },
});
