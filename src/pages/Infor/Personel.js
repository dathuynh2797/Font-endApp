import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import ElevatedView from 'react-native-elevated-view';

export class Personel extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.btnLogout}>Test</Text>
        </View>
        <View style={styles.body}>
          <TouchableOpacity>
            <ElevatedView elevation={6} style={styles.stayElevated}>
              <Image
                source={require('../../img/trip.png')}
                style={styles.Icon}
              />
            </ElevatedView>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  top: {
    flex: 1 / 3,
    backgroundColor: 'yellow',
  },
  btnLogout: {
    alignItems: 'flex-end',
  },
  body: {
    flex: 2 / 3,
    backgroundColor: 'blue',
  },

  stayElevated: {
    alignSelf: 'flex-end',
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
