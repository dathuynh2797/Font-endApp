/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {HeaderLeft, HeaderRight, Title} from '.././Components/CustomHeader';

export class location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapType: 'hybrid',
    };
    this.switchMapType = this.switchMapType.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    const title = navigation.getParam('title', 'chưa có dữ liệu');
    return {
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerTitle: () => <Title title={'Dự án' + ' ' + title} />,
      headerRight: () => <HeaderRight navigation={navigation} />,
    };
  };
  switchMapType = () => {
    this.setState({
      mapType: this.state.mapType === 'hybrid' ? 'standard' : 'hybrid',
    });
  };
  render() {
    const {navigation} = this.props;
    const latitude = navigation.getParam('latitude', 'chưa có dữ liệu');
    const longtitude = navigation.getParam('longtitude', 'chưa có dữ liệu');
    const title = navigation.getParam('title', 'chưa có dữ liệu');
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType={this.state.mapType}
          region={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longtitude),
            latitudeDelta: 0,
            longitudeDelta: 0.004,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longtitude),
            }}
            title={title}
            // description={''}
          />
        </MapView>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255,255,255,0.45)',
            borderRadius: 50,
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
          onPress={this.switchMapType.bind(this)}>
          <Image source={require('../img/Inforicon/maps.png')} />
        </TouchableOpacity>
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
