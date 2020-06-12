/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const {width: WIDTH} = Dimensions.get('window');

const images = [
  {
    // Simplest usage.
    url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    // props: {
    //   source: require('../img/background.jpg'),
    // },
  },
  {
    //   url: '',
    props: {
      // Or you can set source directory.
      source: require('../img/background.jpg'),
    },
  },
];
export class Csbhnv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    // console.log(this.state.idG);
  }

  state = {image: []};

  renderModal() {
    const {navigation} = this.props;
    var hinhanh = [];
    const hinhanhnv = navigation.getParam('hinhanhnv', 'chưa có dữ liệu');
    for (let i = 0; i < hinhanhnv.length; i++) {
      hinhanh.push({url: hinhanhnv[i].publicUrl});
    }
    return (
      <Modal
        onRequestClose={() => {
          this.setState({modal: false});
        }}
        visible={this.state.modal}
        transparent={true}>
        <ImageViewer
          enableSwipeDown={true}
          onSwipeDown={() => this.setState({modal: false})}
          imageUrls={hinhanh}
        />
      </Modal>
    );
  }
  render() {
    const {navigation} = this.props;
    const hinhanhnv = navigation.getParam('hinhanhnv', 'chưa có dữ liệu');
    return (
      <View style={{flex: 1}}>
        {this.renderModal()}
        <FlatList
          style={{}}
          data={hinhanhnv}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.setState({modal: true})}>
              <Image source={{uri: item.publicUrl}} style={styles.image} />
            </TouchableOpacity>
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
