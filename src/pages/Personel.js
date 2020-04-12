import React, {Component} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Button,
} from 'react-native';
import {firebaseApp} from './config';
import 'firebase/firestore';
import {Table, Row, Rows} from 'react-native-table-component';
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
  static navigationOptions = ({navigation}) => {
    return {
      title: 'THÔNG TIN NHÂN VIÊN',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate({routeName: 'HomeScreen'})}>
          <Image source={require('../img/exit.png')} style={styles.iconBack} />
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#0A053F',
      headerTitleAlign: 'center',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      // loading: false,
      tableHead: ['Tên', 'Năm sinh', 'Số điện thoại'],
      tableData: [],
      tableData1: [],
    };
  }

  componentDidMount() {
    const abc = firebaseApp.firestore();
    abc
      .collection('user')
      // .where('authenticationUid', '==', 'Jzc42m2f78VYW9JXgLokBOiCqv72')
      .onSnapshot(querySnapshot => {
        var name = [];
        querySnapshot.forEach(doc => {
          name.push({
            ten: doc.data().fullName,
            sdt: doc.data().phoneNumber,
          });
          this.setState({
            tableData: name,
          });
        });
      });
    abc
      .collection('staff')
      // .where('authenticationUid', '==', 'E8XqxFqdf5evfZQbKNvb3olnCkw1')
      .onSnapshot(querySnapshot => {
        var name1 = [];
        querySnapshot.forEach(doc => {
          name1.push({
            namsinh: doc.data().staffDateOfBirth,
          });
          this.setState({
            tableData1: name1,
          });
        });
      });
  }
  render() {
    return (
      <View style={styles.container}>
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
              <Text
                onPress={() => {
                  this.props.navigation.navigate('detail', {
                    data: this.data,
                  });
                }}>
                {item.ten}
              </Text>
            )}
            keyExtractor={item => item.ten}
          />
          <FlatList
            data={this.state.tableData1}
            renderItem={({item}) => <Text>{item.namsinh}</Text>}
            keyExtractor={item => item.namsinh}
          />

          <FlatList
            data={this.state.tableData}
            renderItem={({item}) => <Text>{item.sdt}</Text>}
            keyExtractor={item => item.sdt}
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
    borderWidth: 1.5,
  },
});
