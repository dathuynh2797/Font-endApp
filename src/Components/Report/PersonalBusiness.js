/* eslint-disable react-native/no-inline-styles */
import React, {Component, Fragment} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {LineChart, BarChart} from 'react-native-charts-wrapper';
import {View, StyleSheet} from 'react-native';

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
export class PersonalBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [
        {
          id: 7,
          name: 'Go',
        },
        {
          id: 8,
          name: 'Swift',
        },
      ],
    };
  }
  render() {
    return (
      <Fragment>
        <SearchableDropdown
          multi={true}
          selectedItems={this.state.selectedItems}
          onItemSelect={item => {
            const items = this.state.selectedItems;
            items.push(item);
            this.setState({selectedItems: items});
          }}
          containerStyle={{padding: 5}}
          onRemoveItem={(item, index) => {
            const items = this.state.selectedItems.filter(
              sitem => sitem.id !== item.id,
            );
            this.setState({selectedItems: items});
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{color: '#222'}}
          itemsContainerStyle={{maxHeight: 140}}
          items={items}
          defaultIndex={2}
          chip={true}
          resetValue={false}
          textInputProps={{
            placeholder: 'placeholder',
            underlineColorAndroid: 'transparent',
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            },
            // onTextChange: text => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
        <SearchableDropdown
          onItemSelect={item => {
            const items = this.state.selectedItems;
            items.push(item);
            this.setState({selectedItems: items});
          }}
          containerStyle={{padding: 5}}
          onRemoveItem={(item, index) => {
            const items = this.state.selectedItems.filter(
              sitem => sitem.id !== item.id,
            );
            this.setState({selectedItems: items});
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{color: '#222'}}
          itemsContainerStyle={{maxHeight: 140}}
          items={items}
          defaultIndex={2}
          resetValue={false}
          textInputProps={{
            placeholder: 'placeholder',
            underlineColorAndroid: 'transparent',
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
            },
            onTextChange: text => alert(text),
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={{
              dataSets: [{label: 'demo', values: [{y: 1}, {y: 2}, {y: 1}]}],
            }}
          />
        </View>
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
});
