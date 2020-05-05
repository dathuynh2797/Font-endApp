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
import {ScrollView} from 'react-native-gesture-handler';

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
    };
  }
  componentDidMount() {
    const abc = firebaseApp.firestore();
    abc.collection('staff').onSnapshot(querySnapshot => {
      var name = [];
      querySnapshot.forEach(doc => {
        name.push({
          id: doc.id,
          ten: doc.data().staffNames,
          sdt: doc.data().staffPhoneNumber,
          namsinh: doc.data().staffDateOfBirth,
          hinhanh: doc.data().staffProfile[0].publicUrl,
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
          <Table>
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
                    this.props.navigation.navigate('detail', {
                      id: item.id,
                      ten: item.ten,
                      sdt: item.sdt,
                      namsinh: item.namsinh,
                      hinhanh: item.hinhanh,
                    });
                  }}>
                  <ScrollView>
                    <Cols
                      data={[[item.ten], [item.namsinh], [item.sdt]]}
                      textStyle={styles.text}
                      style={styles.boder}
                      borderStyle={{borderWidth: 1, borderColor: '#000'}}
                      flexArr={[1.5, 1, 1]}
                    />
                  </ScrollView>
                  {/* keyExtractor={item => item.ten} */}
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
