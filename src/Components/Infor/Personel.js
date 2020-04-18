import React, {Component} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {firebaseApp} from '../config';
import 'firebase/firestore';
import {Table, Row} from 'react-native-table-component';
import {Platform, InteractionManager} from 'react-native';
import {CustomHeader} from '../CustomHeader';

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
      tableData1: [],
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
          hinhanh: doc.data().hinhanh,
        });

        this.setState({
          tableData: name,
          loading: true,
        });
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Danh Sách Nhân Sự"
          navigation={this.props.navigation}
        />
        <Text style={styles.headerText}>Thông tin nhân viên</Text>
        <Table style={styles.borderStyle}>
          <Row
            data={this.state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
        </Table>
        <View style={styles.ngang}>
          <FlatList
            data={this.state.tableData}
            renderItem={({item}) => (
              <View>
                <View style={styles.ngang}>
                  <Text
                    style={styles.data}
                    onPress={() => {
                      this.props.navigation.navigate('detail', {
                        id: item.id,
                        ten: item.ten,
                        sdt: item.sdt,
                        namsinh: item.namsinh,
                        hinhanh: item.hinhanh,
                      });
                    }}>
                    {item.ten}
                  </Text>
                  <Text style={styles.data}>{item.namsinh}</Text>
                  <Text style={styles.data}>{item.sdt}</Text>
                </View>
              </View>
            )}
            keyExtractor={item => item.ten}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: 'white'},
  head: {height: 40, backgroundColor: '#f1f8ff', borderWidth: 1.5},
  text: {margin: 10},
  headerText: {
    width: WIDTH - 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 35,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#2D389C',
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  ngang: {
    flex: 1,
    flexDirection: 'row',
  },
  data: {
    padding: 8,
  },
});
