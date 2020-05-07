/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import {firebaseApp} from '../config';
import {FlatList, Text} from 'react-native';

export class PersonalResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Tên', 'Nhóm', 'Kết quả KD', 'Xếp hạng'],
      tableData: [],
      tableData1: [],
    };
  }
  componentDidMount() {
    const abc = firebaseApp.firestore();
    abc.collection('demo').onSnapshot(querySnapshot => {
      var name = [];
      var ds = [];
      querySnapshot.forEach(doc => {
        name.push({
          // id: doc.id,
          // ten: doc.data().staffNames,
          // nhom: doc.data().staffPhoneNumber,
          doanhso: doc.data().doanhso[0].year.forEach(element => {
            ds.push({
              doanhthu: element.week,
            });
            this.setState({
              loading: false,
              tableData1: ds,
            });
          }),
        });
      });
    });
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row
            data={state.tableHead}
            flexArr={[1, 2, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Rows
              data={state.tableData}
              flexArr={[2, 1, 1]}
              style={styles.row}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
        <FlatList
          data={this.state.tableData1}
          renderItem={({item}) => <Text>{item.doanhthu}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: 28},
  text: {textAlign: 'center'},
});
