/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
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

export class PersonalResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Tên', 'Kết quả KD', 'Xếp hạng'],
      tableData: [],
      tableTitle: [
        ['1'],
        ['2'],
        ['3'],
        ['4'],
        ['5'],
        ['6'],
        ['7'],
        ['8'],
        ['9'],
        ['10'],
      ],
    };
  }
  componentDidMount() {
    const business = firebaseApp.firestore();
    business.collection('user').onSnapshot(querySnapshot => {
      var name = [];
      querySnapshot.forEach(doc => {
        let arr = [];
        let dataDoanhSo = doc.data().doanhso[0].year;
        for (let i = 0; i <= dataDoanhSo.length - 1; i++) {
          if (dataDoanhSo[i] !== null) {
            arr.push(dataDoanhSo[i]);
          }
        }
        name.push({
          id: doc.id,
          ten: doc.data().firstName,
          doanhso: [arr[arr.length - 1]],
          sdt: doc.data().phoneNumber,
          namsinh: doc.data().staffDateOfBirth,
          hinhanh: doc.data().avatars[0].publicUrl,
          email: doc.data().email,
          chucvu: doc.data().roles[0],
        });

        this.setState({
          tableData: name.sort((a, b) => {
            return b.doanhso - a.doanhso;
          }),
        });
      });
    });
  }

  render() {
    const state = this.state;
    const moment = require('moment');
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
              data={this.state.tableData.slice(0, 10)}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('PersonalDetail', {
                      sdt: item.sdt,
                      ten: item.ten,
                      namsinh: item.namsinh,
                      hinhanh: item.hinhanh,
                      email: item.email,
                      chucvu: item.chucvu,
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
            />

            <FlatList
              data={this.state.tableData.slice(0, 10)}
              renderItem={({item}) => (
                <View>
                  <Cols
                    data={[
                      [
                        item.doanhso
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      ],
                    ]}
                    textStyle={styles.text}
                    style={styles.row}
                    borderStyle={{borderWidth: 1, borderColor: '#000'}}
                  />
                </View>
              )}
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
