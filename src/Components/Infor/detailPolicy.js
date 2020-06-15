/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {HeaderLeft, HeaderRight, Title} from '../CustomHeader';

import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const {width: WIDTH} = Dimensions.get('window');
export class detailPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    // console.log(this.state.idG);
  }
  static navigationOptions = ({navigation}) => {
    const name = navigation.getParam('name', 'chưa có dữ liệu');
    return {
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerTitle: () => <Title title={name} />,
      headerRight: () => <HeaderRight navigation={navigation} />,
    };
  };
  state = {image: []};

  renderModal() {
    // console.log(this.state.image);
    const {navigation} = this.props;
    var hinhanh = [];
    const image = navigation.getParam('image', 'chưa có dữ liệu');
    // console.log(hinhanhqc);
    for (let i = 0; i < image.length; i++) {
      hinhanh.push({url: image[i].publicUrl});
    }
    return (
      <View>
        <Modal
          onRequestClose={() => {
            this.setState({modal: false});
          }}
          // animationType={'fade'}
          visible={this.state.modal}
          transparent={true}>
          <TouchableHighlight
            style={styles.Button}
            onPress={() => {
              this.setState({modal: false});
            }}>
            <Image
              source={require('../../img/backwhite.png')}
              style={styles.IconBack}
            />
          </TouchableHighlight>
          <ImageViewer
            enableSwipeDown={true}
            onSwipeDown={() => this.setState({modal: false})}
            imageUrls={hinhanh}
          />
        </Modal>
      </View>
    );
  }
  render() {
    const {navigation} = this.props;
    const image = navigation.getParam('image', 'chưa có dữ liệu');
    return (
      <ImageBackground
        source={require('../../img/background.jpg')}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          {this.renderModal()}
          <FlatList
            style={{}}
            data={image}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => this.setState({modal: true})}>
                <Image source={{uri: item.publicUrl}} style={styles.image} />
              </TouchableOpacity>
            )}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  Proflie: {
    // resizeMode: 'contain',
    flex: 1,
  },
  Button: {
    backgroundColor: '#000000',
    padding: 10,
    elevation: 2,
  },
  IconBack: {
    marginLeft: 10,
    height: 20,
    width: 20,
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
    resizeMode: 'stretch',
    marginVertical: 10,
    width: WIDTH - 20,
    height: 480,
    // backgroundColor: 'grey',
  },
  // outside: {resizeMode: 'contain'},
  iconBack: {
    width: 30,
    height: 30,
  },
  child2: {flex: 15, margin: 10},
});
