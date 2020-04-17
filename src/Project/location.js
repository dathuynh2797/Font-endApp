import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import {firebaseApp} from '../pages/config';
import 'firebase/firestore';

export class location extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
    };
  }
  componentDidMount() {
    const vitri = firebaseApp.firestore().collection('location');
    vitri.onSnapshot(querySnapshot => {
      var marker1 = [];
      querySnapshot.forEach(doc => {
        marker1.push({
          lati: doc.data().lat,
          longi: doc.data().long,
        });
        this.setState({
          markers: marker1,
        });
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.markers.map(marker => (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: parseFloat(marker.lati),
              longitude: parseFloat(marker.longi),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            keyExtractor={(item => item.lati, item => item.longi)}>
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(marker.lati),
                longitude: parseFloat(marker.longi),
              }}
              title={'nha em'}
              description={'nha em ne'}
            />
          </MapView>
        ))}
      </View>
      // <View>
      //   <FlatList
      //     data={this.state.markers}
      //     renderItem={({item}) => <Text>{item.longi}</Text>}
      //     keyExtractor={item => item.sdt}
      //   />
      // </View>
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
