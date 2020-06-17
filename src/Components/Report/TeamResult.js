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
export class TeamResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Tên Nhóm', 'Tên Phòng', 'Kết quả KD', 'Xếp hạng'],
      tableTitle: [],
      idNV: [],
      user: [],
      dS: [],
      dataArrWeek: [],
      dtNameDs: [],
      dtLastWeek: [],
      dtNameDsP: [],
      loading: false,
    };
  }

  componentDidMount() {
    const dataY = firebaseApp.firestore().collection('stall');
    var idDS = [];
    var idphong = [];
    var dataArrWeek = [];
    var arrDS = [];
    var arr = [];
    var stt = [];
    var tenNV = [];
    dataY.get().then(queryY => {
      queryY.forEach(doc => idDS.push(doc.data()));
      for (let i = 0; i < idDS.length; i++) {
        arr = Object.entries(idDS[i]);
        // console.log(arr);
        for (let y = 0; y < arr.length; y++) {
          if (moment().year() === parseInt(arr[y][0], 0)) {
            dataArrWeek.push({
              id: arr[2][1],
              name: arr[arr.length - 78][1],
              doanhso: arr[y][1],
            });
          }
        }
        arr = [];
      }
      // var seconds = arr[arr.length - 1];
      // console.log(seconds);
      // console.log(dataArrWeek);
      this.setState({
        dataArrWeek: dataArrWeek,
      });
      for (let i = 0; i < this.state.dataArrWeek.length; i++) {
        arrDS.push({
          id: dataArrWeek[i].id,
          ds: Object.values(dataArrWeek[i].doanhso).slice(16, 77),
          name: dataArrWeek[i].name,
        });
      }
      this.setState({
        dS: arrDS,
      });
      var dt = this.state.dS;
      // console.log(dt);
      var datalastweek = [];
      for (let z = 0; z < dt.length; z++) {
        for (let y = 0; y < dt[z].ds.length; y++) {
          if (dt[z].ds[y] !== 0) {
            datalastweek.push({
              id: dt[z].id,
              ds: dt[z].ds[y],
              name: dt[z].name,
            });
            break;
          }
        }
      }
      // console.log(datalastweek);
      this.setState({
        dtLastWeek: datalastweek.sort((a, b) => b.ds - a.ds),
        tableTitle: stt,
      });
      var tenphong = [];
      firebaseApp
        .firestore()
        .collection('units')
        .get()
        .then(querySnapshot => {
          tenNV = [];
          querySnapshot.forEach(doc => {
            idphong.push({
              name: doc.data().unitsTitle,
              mangnhom: doc.data().productStall,
            });
          });
          // console.log(idphong);
          // console.log(this.state.dtLastWeek);
          for (let p = 0; p < this.state.dtLastWeek.length; p++) {
            for (let n = 0; n < idphong.length; n++) {
              for (let f = 0; f < idphong[n].mangnhom.length; f++) {
                if (this.state.dtLastWeek[p].id === idphong[n].mangnhom[f]) {
                  tenphong.push({
                    id: this.state.dtLastWeek[p].id,
                    tenphong: idphong[n].name,
                    ds: this.state.dtLastWeek[p].ds
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                    tennhom: this.state.dtLastWeek[p].name,
                  });
                  // console.log(this.state.dtLastWeek[p].id);
                }
              }
            }
            stt.push([p + 1]);
          }
          this.setState({dtNameDsP: tenphong, loading: true});
          // console.log(tenphong);
        });
    });
  }

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
              data={this.state.dtNameDsP.slice(0, 10)}
              renderItem={({item}) => (
                <Cols
                  data={[[item.tennhom]]}
                  textStyle={{margin: 5}}
                  style={styles.row}
                  borderStyle={{borderWidth: 1, borderColor: '#000'}}
                />
              )}
              keyExtractor={item => item.tennhom}
            />
            <FlatList
              data={this.state.dtNameDsP.slice(0, 10)}
              renderItem={({item}) => (
                <Cols
                  data={[[item.tenphong]]}
                  textStyle={{textAlign: 'left', margin: 5}}
                  style={styles.row}
                  borderStyle={{borderWidth: 1, borderColor: '#000'}}
                />
              )}
              keyExtractor={item => item.id}
            />
            <FlatList
              data={this.state.dtNameDsP.slice(0, 10)}
              renderItem={({item}) => (
                <View>
                  <Cols
                    data={[
                      [item.ds],
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
              keyExtractor={item => item.id}
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
  // text: {textAlign: 'center'},
  titles: {fontSize: 18},
});
