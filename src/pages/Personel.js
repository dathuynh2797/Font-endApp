import React, {Component} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  statusBarHeight,
  numColumns,
} from 'react-native';
import {firebaseApp} from './config';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {Platform, InteractionManager} from 'react-native';
import {HeaderTitle} from 'react-navigation-stack';

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
// function Row({title}) {
//   return (
//     <View style={styles.item}>
//       <Text>{title}</Text>
//     </View>
//   );
// }
export class Personel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // loading: false,
      tableHead: ['Tên', 'Năm sinh', 'Số điện thoại'],
      tableData: [],
    };
  }
  componentDidMount() {
    firebaseApp
      .database()
      .ref('thongtinnhanvien')
      .child('nhanvien1')
      .once('value', dataSnapshot => {
        var tableData = [];
        dataSnapshot.forEach(doc => {
          tableData.push({
            key: doc.key,
            name: doc.val(),
          });
          this.setState({
            data1: tableData,
          });
        });
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.item}>Thông tin nhân viên</Text>
        <Table style={styles.borderStyle}>
          <Row
            data={this.state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          <FlatList
            data={this.state.data1}
            renderItem={({item}) => (
              <Text>
                <Row data1={item.name} textStyle={styles.text} />
              </Text>
            )}
          />
        </Table>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  borderStyle: {
    borderWidth: 1.5,
    borderColor: 'black',
  },
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: 'white'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 10},
});
