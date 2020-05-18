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
  TouchableOpacity,
} from 'react-native-table-component';
import {firebaseApp} from '../config';
import {FlatList, Text} from 'react-native';

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
        name.push({
          id: doc.id,
          ten: doc.data().fullName,
          doanhso: [
            doc.data().doanhso[0].year[doc.data().doanhso[0].year.length - 1],
          ],
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
    return (
      <View style={styles.container}>
        <Text style={styles.titles}>
          kết quả kinh doanh tuần của nhân viên từ {Date()}
        </Text>
        <Table>
          <Row
            data={state.tableHead}
            flexArr={[1, 1, 1]}
            style={styles.head}
            textStyle={styles.text}
            borderStyle={{borderWidth: 1, borderColor: '#000'}}
          />

          <TableWrapper style={styles.wrapper}>
            <FlatList
              data={this.state.tableData.slice(0, 10)}
              renderItem={({item}) => (
                <View>
                  <Cols
                    data={[[item.ten]]}
                    textStyle={styles.text}
                    windowSize={10}
                    style={styles.row}
                    borderStyle={{borderWidth: 1, borderColor: '#000'}}
                  />
                </View>
              )}
            />
            <FlatList
              data={this.state.tableData.slice(0, 10)}
              renderItem={({item}) => (
                <View>
                  <Cols
                    data={[[item.doanhso]]}
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
  head: {height: 45, backgroundColor: '#f1f8ff'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: 45},
  text: {textAlign: 'center'},
  titles: {fontSize: 15},
});
