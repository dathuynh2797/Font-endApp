import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

export class Personel extends Component {
  render() {
    return (
      <View style={styles.shadow}>
        <TouchableOpacity style={styles.cirle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cirle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 0.8,
    // borderBottomWidth: 0,
    marginBottom: 3,
    height: 80,
    width: 80,
  },
  shadow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,

      height: 3,
    },

    shadowRadius: 5,

    shadowOpacity: 2.0,
  },
});
