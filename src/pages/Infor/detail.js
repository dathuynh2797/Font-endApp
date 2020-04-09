import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

export class detail extends Component {
  constructor(props) {
    super(props);
    this.state = {data: ''};
  }
  componentDidMount() {
    const data = this.props.navigation.getParam('data', 'some default value');
    this.setState({
      data: data,
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <Text>{item.name}</Text>}
        />
        {/* <Text>{this.state.data}</Text> */}
      </View>
    );
  }
}
