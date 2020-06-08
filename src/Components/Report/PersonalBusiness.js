/* eslint-disable react-native/no-inline-styles */
import React, {Component, Fragment} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {LineChart, BarChart} from 'react-native-charts-wrapper';
import {Header} from 'react-navigation-stack';
import {
  View,
  StyleSheet,
  SafeAreaView,
  processColor,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {firebaseApp} from '../config';

var thang = [
  {
    id: 1,
    name: 'Tháng 1',
  },
  {
    id: 2,
    name: 'Tháng 2',
  },
  {
    id: 3,
    name: 'Tháng 3',
  },
  {
    id: 4,
    name: 'Tháng 4',
  },
  {
    id: 5,
    name: 'Tháng 5',
  },
  {
    id: 6,
    name: 'Tháng 6',
  },
  {
    id: 7,
    name: 'Tháng 7',
  },
  {
    id: 8,
    name: 'Tháng 8',
  },
  {
    id: 9,
    name: 'Tháng 9',
  },
  {
    id: 9,
    name: 'Tháng 9',
  },
  {
    id: 10,
    name: 'Tháng 10',
  },
  {
    id: 11,
    name: 'Tháng 11',
  },
  {
    id: 12,
    name: 'Tháng 12',
  },
];

var quy = [
  {
    id: 1,
    name: 'Quý I',
  },
  {
    id: 2,
    name: 'Quý II',
  },
  {
    id: 3,
    name: 'Quý III',
  },
  {
    id: 4,
    name: 'Quý IV',
  },
];

export class PersonalBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleChart: true,
      item: [],
      doanhSo: [],
      year: [],
      quy: [],
      yearChart: [],
      marker: {
        enabled: true,
        digits: 2,
        backgroundTint: processColor('yellow'),
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
      },
      legend: {
        enabled: true,
        textColor: processColor('red'),
        textSize: 12,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5,
        custom: {
          colors: [processColor('red'), processColor('red')],
          labels: ['REFER', 'USER'],
        },
      },
      yAxis: {
        left: {
          enabled: true,
          drawGridLines: true,
        },
        right: {
          enabled: false,
          drawGridLines: false,
        },
      },
      dataChart: {x: 1, y: 0},
    };
  }

  handleSelect = e => {
    const dataY = firebaseApp.firestore().collection('taxClass');
    const dataYear = [];
    const dataArrYear = [];
    dataY.onSnapshot(queryY =>
      queryY.forEach(doc => {
        if (e.id === doc.id) {
          const arr = Object.entries(doc.data());
          for (let i = 0; i < arr.length - 1; i++) {
            dataYear.push({
              id: i,
              name: arr[i][0],
            });
            dataArrYear.push({
              id: i,
              // name: arr[i][0],
              doanhSo: arr[i][1],
            });
          }
          this.setState({
            year: dataYear,
            quy: quy,
            doanhSo: dataArrYear,
          });
        }
      }),
    );
  };

  handleSelectYear = e => {
    if (e.id === this.state.doanhSo[e.id].id) {
      console.log(this.state.doanhSo[e.id].doanhSo);
    }
  };

  handleSelectQuy = e => {
    // console.log(e);
  };

  handleSubmit() {}

  componentDidMount() {
    const data = firebaseApp.firestore().collection('user');
    const newData = [];
    data.onSnapshot(query =>
      query.forEach(doc => {
        if (
          doc.data().fullName !== null &&
          doc.data().fullName !== undefined &&
          doc.data().roles[0] !== 'Admin'
        ) {
          newData.push({
            id: doc.id,
            name: doc.data().fullName,
          });
        }
      }),
    );
    this.setState(
      {
        item: newData,
      },
      // () => console.log('state', this.state.item),
    );
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={-500}
        style={{flex: 1}}>
        <SafeAreaView style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={{flex: 1 / 3}}>
            <SearchableDropdown
              onTextChange={text => text}
              onItemSelect={item => this.handleSelect(item)}
              items={this.state.item}
              containerStyle={{marginTop: 20, marginHorizontal: 20}}
              textInputStyle={{
                padding: 10,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
              }}
              itemStyle={{
                padding: 10,
                marginTop: 4,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                maxHeight: 90,
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <SearchableDropdown
                onTextChange={text => text}
                onItemSelect={item => this.handleSelectYear(item)}
                items={this.state.year}
                containerStyle={{marginTop: 20, marginLeft: 20, flex: 1 / 3}}
                textInputStyle={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#FAF7F6',
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 4,
                  backgroundColor: '#FAF9F8',
                  borderColor: '#bbb',
                  borderWidth: 1,
                }}
                itemsContainerStyle={{
                  //items container style you can pass maxHeight
                  //to restrict the items dropdown hieght
                  maxHeight: 90,
                }}
              />
              <SearchableDropdown
                onTextChange={text => text}
                onItemSelect={item => this.handleSelectQuy(item)}
                items={this.state.quy}
                containerStyle={{
                  marginTop: 20,
                  marginHorizontal: 5,
                  flex: 1 / 3,
                }}
                textInputStyle={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#FAF7F6',
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 4,
                  backgroundColor: '#FAF9F8',
                  borderColor: '#bbb',
                  borderWidth: 1,
                }}
                itemsContainerStyle={{
                  //items container style you can pass maxHeight
                  //to restrict the items dropdown hieght
                  maxHeight: 90,
                }}
              />
              <SearchableDropdown
                onTextChange={text => text}
                onItemSelect={item => item}
                items={this.state.year}
                containerStyle={{marginTop: 20, marginRight: 20, flex: 1 / 3}}
                textInputStyle={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#FAF7F6',
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 4,
                  backgroundColor: '#FAF9F8',
                  borderColor: '#bbb',
                  borderWidth: 1,
                }}
                itemsContainerStyle={{
                  //items container style you can pass maxHeight
                  //to restrict the items dropdown hieght
                  maxHeight: 90,
                }}
              />
            </View>
            <TouchableOpacity
              onPress={this.handleSubmit()}
              style={{
                alignItems: 'center',
                backgroundColor: 'yellow',
                alignSelf: 'center',
                marginVertical: 10,
                padding: 10,
              }}>
              <Text>Tìm Kiếm</Text>
            </TouchableOpacity>
          </View>
          {this.state.toggleChart ? (
            <View style={styles.container}>
              <View>
                <Text>Đồ thị kết quả kinh doanh</Text>
              </View>
              <LineChart
                style={styles.chart}
                marker={this.state.marker}
                data={{
                  dataSets: [{label: 'demo', values: [this.state.dataChart]}],
                }}
                yAxis={this.state.yAxis}
              />
            </View>
          ) : (
            <View style={styles.container} />
          )}
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
