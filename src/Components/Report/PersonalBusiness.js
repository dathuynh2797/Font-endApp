/* eslint-disable react-native/no-inline-styles */
import React, {Component, Fragment} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {LineChart, BarChart} from 'react-native-charts-wrapper';
import {View, StyleSheet, SafeAreaView, processColor} from 'react-native';
import {firebaseApp} from '../config';

var items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];
var year = [
  {
    id: 1,
    name: '2019',
  },
  {
    id: 2,
    name: '2020',
  },
];
export class PersonalBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleChart: true,
      item: [],
      marker: {
        enabled: true,
        digits: 2,
        backgroundTint: processColor('red'),
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
      xAxis: {
        granularityEnabled: true,
        granularity: 1,
      },
      dataChart: {x: 1, y: 0},
    };
  }

  handleSelect = e => {
    console.log(e);
  };

  componentDidMount() {
    const data = firebaseApp.firestore().collection('user');
    const newData = [];
    data.onSnapshot(query =>
      query.forEach(doc => {
        if (doc.data().fullName !== null && doc.data().fullName !== undefined) {
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
      () => console.log(this.state.item),
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'grey'}}>
        <View style={{flex: 2 / 3, backgroundColor: 'red'}}>
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
              onItemSelect={item => item}
              items={year}
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
              onItemSelect={item => item}
              items={year}
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
              items={year}
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
        </View>
        {this.state.toggleChart ? (
          <View style={styles.container}>
            <LineChart
              style={styles.chart}
              marker={this.state.marker}
              data={{
                dataSets: [{label: 'demo', values: [this.state.dataChart]}],
              }}
            />
          </View>
        ) : (
          <View style={styles.container} />
        )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
