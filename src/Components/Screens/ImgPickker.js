import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import ActionSheet from 'react-native-custom-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

const W = Dimensions.get('window').width;

const CANCEL_INDEX = 2;
const DESTRUCTIVE_INDEX = 4;
const options = ['Take Photo', 'Choose Photo Libary', 'Cancel'];
const title = 'Which one do you like?';

export class ImgPickker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      selected: '',
    };
  }

  onSelectedImage = image => {
    let newDataImg = this.state.fileList;
    const source = {url: image.path};
    let item = {
      id: Date.now(),
      url: source,
      content: image.data,
    };
    newDataImg.push(item);
    this.setState({fileList: newDataImg});
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.7,
      includeBase64: true,
      cropping: true,
    }).then(image => {
      //   console.log(image);
      this.onSelectedImage(image);
    });
  };

  ChoosePhotoFromLibary = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.7,
      includeBase64: true,
      cropping: true,
    }).then(image => {
      //   console.log(image);
      this.onSelectedImage(image);
    });
  };

  renderItem = ({item, index}) => {
    return (
      <View>
        <Image source={item.url} style={styles.imgContent} />
      </View>
    );
  };

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = ref => (this.actionSheet = ref);

  handlePress = index => {
    switch (index) {
      case 0:
        this.takePhotoFromCamera();
        // Alert.alert(options[index]);
        break;
      case 1:
        this.ChoosePhotoFromLibary();
        // Alert.alert(options[index]);
        break;
    }
  };

  render() {
    let {content, button, txtColor} = styles;
    let {fileList} = this.state;
    return (
      <SafeAreaView style={content}>
        <Text>React Native Image Example</Text>
        <FlatList
          data={fileList}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
        />
        <TouchableOpacity style={button} onPress={this.showActionSheet}>
          <Text style={txtColor}>Add Image</Text>
        </TouchableOpacity>
        <ActionSheet
          ref={this.getActionSheetRef}
          title={title}
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#0394fc',
    marginBottom: 30,
  },
  txtColor: {
    color: '#fff',
  },
  imgContent: {
    width: W - 60,
    height: 150,
    // backgroundColor: '#2f455c',
    resizeMode: 'contain',
  },
});
