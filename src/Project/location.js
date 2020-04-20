import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';

export class location extends Component {
  render() {
    const {navigation} = this.props;
    const latitude = navigation.getParam('latitude', 'chưa có dữ liệu');
    const longtitude = navigation.getParam('longtitude', 'chưa có dữ liệu');
    return (
      <View style={styles.container}>
        {/* {this.state.markers.map(marker => ( */}
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longtitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          keyExtractor={(item => item.lati, item => item.longi)}>
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longtitude),
            }}
            title={'nha em'}
            description={'nha em ne'}
          />
        </MapView>
        {/* )} */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
});
