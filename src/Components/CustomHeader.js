import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

export class CustomHeader extends Component {
  render() {
    let {title, navigation} = this.props;
    return (
      <View style={styles.Header}>
        <TouchableOpacity
          style={styles.Left}
          onPress={() => navigation.goBack()}>
          <Image source={require('../img/back.png')} style={styles.IconBack} />
        </TouchableOpacity>
        <View style={styles.Title}>
          <Text style={styles.Text}>{title}</Text>
        </View>
        <TouchableOpacity
          style={styles.Right}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../img/exit.png')} style={styles.IconExit} />
        </TouchableOpacity>
      </View>
    );
  }
  d;
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 0.5,
    marginBottom: 10,
    // backgroundColor: 'white',
  },
  Left: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    // borderColor: 'red',
  },
  Title: {
    flex: 3,
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Right: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    // borderColor: 'red',
  },
  Text: {
    fontWeight: '700',
    fontSize: 20,
  },
  IconBack: {
    marginLeft: 10,
    height: 30,
    width: 30,
  },
  IconExit: {
    marginLeft: 40,
    height: 25,
    width: 25,
  },
});
