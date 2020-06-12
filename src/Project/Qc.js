/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions, FlatList} from 'react-native';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
// import {firebaseApp} from './config';
const {width: WIDTH} = Dimensions.get('window');
export class Qc extends Component {
  state = {image: []};
  componentDidMount() {
    const {navigation} = this.props;
    var hinhanh = [];
    const hinhanhqc = navigation.getParam('hinhanhqc', 'chưa có dữ liệu');
    for (let i = 0; i < hinhanhqc.length; i++) {
      hinhanh.push({url: hinhanhqc[i].publicUrl});
    }
    this.setState({image: hinhanh});
  }
  renderModal() {
    console.log(this.state.image);

    return (
      <Modal visible={true} transparent={true}>
        <ImageViewer imageUrls={this.state.image} />
      </Modal>
    );
  }
  render() {
    const {navigation} = this.props;
    const hinhanhqc = navigation.getParam('hinhanhqc', 'chưa có dữ liệu');
    return (
      <View style={{flex: 1}}>
        {this.renderModal()}
        <FlatList
          style={{}}
          data={hinhanhqc}
          renderItem={({item}) => (
            <Image source={{uri: item.publicUrl}} style={styles.image} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Proflie: {
    // resizeMode: 'contain',
    flex: 1,
  },
  headerText: {
    width: WIDTH - 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 40,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#2D389C',
  },
  image: {
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 10,
    width: 360,
    height: 180,
    // backgroundColor: 'grey',
  },
  // outside: {resizeMode: 'contain'},
  iconBack: {
    width: 30,
    height: 30,
  },
  child1: {flex: 1},
  child2: {flex: 15, margin: 10},
});
