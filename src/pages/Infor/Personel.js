import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import ElevatedView from 'react-native-elevated-view';

export class Personel extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <ElevatedView elevation={24} style={styles.stayElevated}>
            <Image source={require('../../img/trip.png')} style={styles.Icon} />
          </ElevatedView>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stayElevated: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 50,
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: 'white',
  },
  Icon: {
    height: 50,
    width: 50,
  },
});
