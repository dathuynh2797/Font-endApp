/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Platform,
  SafeAreaView,
} from 'react-native';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const {width: WIDTH} = Dimensions.get('window');
export class Bg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    // console.log(this.state.idG);
  }

  state = {image: []};

  renderModal() {
    console.log(this.state.image);
    const {navigation} = this.props;
    var hinhanh = [];
    const hinhanhbg = navigation.getParam('hinhanhbg', 'chưa có dữ liệu');
    // console.log(hinhanhqc);
    for (let i = 0; i < hinhanhbg.length; i++) {
      hinhanh.push({url: hinhanhbg[i].publicUrl});
    }
    return (
      <SafeAreaView style={styles.Container}>
        <View>
          <Modal
            onRequestClose={() => {
              this.setState({modal: false});
            }}
            // animationType={'fade'}
            visible={this.state.modal}
            transparent={true}>
            <ImageViewer
              renderHeader={() => {
                return (
                  <View>
                    <TouchableOpacity
                      style={[styles.Button]}
                      onPress={() => {
                        this.setState({modal: false});
                      }}>
                      <Image
                        source={require('../img/backwhite.png')}
                        style={styles.IconBack}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
              enableSwipeDown={true}
              onSwipeDown={() => this.setState({modal: false})}
              imageUrls={hinhanh}
            />
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
  render() {
    const {navigation} = this.props;
    const hinhanhbg = navigation.getParam('hinhanhbg', 'chưa có dữ liệu');
    return (
      <ImageBackground
        source={require('../img/background.jpg')}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          {this.renderModal()}

          <FlatList
            style={{}}
            data={hinhanhbg}
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
  Button: {
    backgroundColor: '#000000',
    padding: 10,
    elevation: 2,
    marginTop: Platform.OS === 'ios' ? 30 : 0,
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
  Container: {
    flex: 1,
  },
  child1: {flex: 1},
  child2: {flex: 15, margin: 10},
});
