/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
const moment = require('moment');
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
} from 'react-native-table-component';
import {firebaseApp} from '../config';
import {FlatList, Text, TouchableOpacity} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const height = (windowHeight - (windowHeight * 40) / 100) / 10;
export class PersonalResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Tên', 'Kết quả KD', 'Xếp hạng'],
      tableData: [],
      idNV: [],
      user: [],
      dS: [],
      dataArrWeek: [],
      dtNameDs: [],
      dtLastWeek: [],
      tableTitle: [],
      loading: false,
    };
  }

  componentDidMount = async () => {
    // console.log((windowHeight - (windowHeight * 39) / 100) / 10);
    const business = firebaseApp.firestore();
    business
      .collection('user')
      .get()
      .then(querySnapshot => {
        var name = [];
        var idNV = [];
        var idNv = [];
        tenNV = [];
        querySnapshot.forEach(doc => {
          idNV.push(doc.data().id);
          name.push({
            id: doc.data().id,
            ten: doc.data().fullName,
          });
          this.setState({
            userDetial: name,
            idNV: idNV,
          });
        });
      });
    const dataY = firebaseApp.firestore().collection('taxClass');
    var idDS = [];
    var dataArrWeek = [];
    var arrDS = [];
    var arr = [];
    var stt = [];
    var tenNV = [];
    var stt = [];
    dataY.onSnapshot(queryY => {
      queryY.forEach(doc => idDS.push({id: doc.data().id, value: doc.data()}));
      // console.log(idDS);
      for (let j = 0; j < this.state.idNV.length; j++) {
        for (let k = 0; k < idDS.length; k++) {
          if (this.state.idNV[j] === idDS[k].id) {
            arr = Object.entries(idDS[k].value);
          }
        }
        var seconds = arr[arr.length - 1];
        for (let i = 0; i < arr.length; i++) {
          if (moment().year() === parseInt(arr[i][0], 0)) {
            dataArrWeek.push({
              id: seconds[1],
              doanhso: arr[i][1],
            });
          }
        }
        arr = [];
      }
      // console.log(dataArrWeek);
      this.setState({
        dataArrWeek: dataArrWeek,
      });
      for (let i = 0; i < this.state.dataArrWeek.length; i++) {
        arrDS.push({
          ds: Object.values(dataArrWeek[i].doanhso).slice(16, 77),
          id: dataArrWeek[i].id,
        });
      }
      this.setState({
        dS: arrDS,
      });
      var dt = this.state.dS;
      // console.log(dt);
      var datalastweek = [];
      for (let z = 0; z < dt.length; z++) {
        // for (let t = 0; t < dt[z].ds.length; t++) {
        //   if (dt[z].ds[t] !== 0) {
        //     datalastweek.push({
        //       ds: dt[z].ds[t],
        //       id: dt[z].id,
        //     });
        //   }
        // }
        // dt[z] = [];
        for (let y = dt[z].ds.length - 1; y > -1; y--) {
          if (dt[z].ds[y] !== 0) {
            datalastweek.push({
              ds: dt[z].ds[y],
              id: dt[z].id,
            });
            break;
          }
        }
        // console.log(datalastweek);
      }
      this.setState({
        dtLastWeek: datalastweek.sort((a, b) => b.ds - a.ds),
        tableTitle: stt,
      });
    });

    firebaseApp
      .firestore()
      .collection('user')
      .get()
      .then(querySnapshot => {
        for (let v = 0; v < this.state.dtLastWeek.length; v++) {
          querySnapshot.forEach(doc => {
            if (this.state.dtLastWeek[v].id === doc.id) {
              tenNV.push({
                id: this.state.dtLastWeek[v].id,
                doanhso: this.state.dtLastWeek[v].ds
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                ten: doc.data().fullName,
                sdt: doc.data().phoneNumber,
                email: doc.data().email,
                hinhanh: doc.data().avatars[0].publicUrl,
                sinhnhat: doc.data().staffDateOfBirth,
                chucvu: doc.data().roles[0],
                idphong: doc.data().productUnit,
                idnhom: doc.data().iamTeam,
              });
            }
          });
          stt.push([v + 1]);
        }
        this.setState({
          dtNameDs: tenNV,
          loading: true,
        });
        // console.log(tenNV);
      });
  };

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titles}>
          kết quả kinh doanh tuần của nhân viên từ{' '}
          <Text style={{fontSize: 16.5, fontWeight: 'bold'}}>
            {moment()
              .weekday(1)
              .format('DD/MM')}{' '}
          </Text>
          đến{' '}
          <Text style={{fontSize: 16.5, fontWeight: 'bold'}}>
            {moment()
              .weekday(6)
              .format('DD/MM')}
          </Text>
        </Text>
        <Table>
          <Row
            data={state.tableHead}
            flexArr={[1, 1, 1]}
            style={styles.head}
            textStyle={styles.textHead}
            borderStyle={{borderWidth: 1, borderColor: '#000'}}
          />
          <TableWrapper style={styles.wrapper}>
            <FlatList
              data={this.state.dtNameDs.slice(0, 10)}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('PersonalDetail', {
                      sdt: item.sdt,
                      ten: item.ten,
                      namsinh: item.sinhnhat,
                      hinhanh: item.hinhanh,
                      email: item.email,
                      chucvu: item.chucvu,
                      idphong: item.idphong,
                      idnhom: item.idnhom,
                    });
                  }}>
                  <Cols
                    data={[[item.ten]]}
                    textStyle={styles.text}
                    style={styles.row}
                    borderStyle={{borderWidth: 1, borderColor: '#000'}}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.sdt}
            />

            <FlatList
              data={this.state.dtNameDs.slice(0, 10)}
              renderItem={({item}) => (
                <View>
                  <Cols
                    data={[
                      [item.doanhso],
                      // item.ds[
                      //   item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      // ],
                    ]}
                    textStyle={{textAlign: 'center'}}
                    style={styles.row}
                    borderStyle={{borderWidth: 1, borderColor: '#000'}}
                  />
                </View>
              )}
              keyExtractor={item => item.email}
            />
            <Col
              data={state.tableTitle.slice(0, 10)}
              style={styles.title}
              heightArr={[
                height,
                height,
                height,
                height,
                height,
                height,
                height,
                height,
                height,
                height,
              ]}
              borderStyle={{borderWidth: 1, borderColor: '#000'}}
              textStyle={{textAlign: 'center'}}
            />
          </TableWrapper>
        </Table>
        {this.state.loading && (
          <Text style={{textAlign: 'right'}}>Đơn vị: Triệu Đồng</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 5, paddingTop: 20, backgroundColor: '#fff'},
  head: {height: height, backgroundColor: '#1787AB'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: height},
  textHead: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  text: {textAlign: 'left', margin: 5},
  titles: {fontSize: 18},
});
