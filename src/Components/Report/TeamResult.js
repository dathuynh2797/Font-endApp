/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
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

export class TeamResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Tên Nhóm', 'Tên Phòng', 'Kết quả KD', 'Xếp hạng'],
      tableData: [],
      idNV: [],
      user: [],
      dS: [],
      dataArrWeek: [],
      dtNameDs: [],
      dtLastWeek: [],
      dtNameDsP: [],
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
              name: arr[arr.length - 1][1],
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
        for (let y = dt[z].ds.length - 1; y > -1; y--) {
          if (dt[z].ds[y] !== 0) {
            datalastweek.push({
              id: dt[z].id,
              ds: [dt[z].ds[y]],
              name: dt[z].name,
            });
            stt.push([z + 1]);
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
                    ds: this.state.dtLastWeek[p].ds,
                    tennhom: this.state.dtLastWeek[p].name,
                  });
                  // console.log(this.state.dtLastWeek[p].id);
                }
              }
            }
          }
          this.setState({dtNameDsP: tenphong});
          console.log(tenphong);
        });
    });
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titles}>
          kết quả kinh doanh tuần của nhân viên từ{' '}
          {moment()
            .weekday(1)
            .format('DD/MM')}{' '}
          đến{' '}
          {moment()
            .weekday(6)
            .format('DD/MM')}
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
              data={this.state.dtNameDsP}
              renderItem={({item}) => (
                <Cols
                  data={[[item.tennhom]]}
                  textStyle={styles.text}
                  style={styles.row}
                  borderStyle={{borderWidth: 1, borderColor: '#000'}}
                />
              )}
              keyExtractor={item => item.tennhom}
            />
            <FlatList
              data={this.state.dtNameDsP}
              renderItem={({item}) => (
                <Cols
                  data={[[item.tenphong]]}
                  textStyle={styles.text}
                  style={styles.row}
                  borderStyle={{borderWidth: 1, borderColor: '#000'}}
                />
              )}
              keyExtractor={item => item.id}
            />
            <FlatList
              data={this.state.dtNameDsP}
              renderItem={({item}) => (
                <View>
                  <Cols
                    data={[
                      item.ds,
                      // item.ds[
                      //   item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      // ],
                    ]}
                    textStyle={styles.text}
                    style={styles.row}
                    borderStyle={{borderWidth: 1, borderColor: '#000'}}
                  />
                </View>
              )}
              keyExtractor={item => item.id}
            />
            <Col
              data={state.tableTitle}
              style={styles.title}
              heightArr={[45, 45, 45, 45, 45, 45, 45, 45, 45, 45]}
              borderStyle={{borderWidth: 1, borderColor: '#000'}}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 5, paddingTop: 20, backgroundColor: '#fff'},
  head: {height: 45, backgroundColor: '#1787AB'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: 45},
  textHead: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  text: {textAlign: 'center'},
  titles: {fontSize: 15},
});
