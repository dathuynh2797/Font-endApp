import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {firebaseApp} from '../config';
const {width: WIDTH} = Dimensions.get('window');
export class Qdctp extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'CHÍNH SÁCH CÔNG TY',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate({routeName: 'HomeScreen'})}>
          <Image
            source={require('../../img/exit.png')}
            style={styles.iconBack}
          />
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#0A053F',
      headerTitleAlign: 'center',
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: [],
    };
  }
  componentDidMount() {
    const image = firebaseApp.firestore();
    image
      .collection('categories')
      .where('categoryDetails', '==', 'qlctp')
      .onSnapshot(querySnapshot => {
        var anh = [];
        querySnapshot.forEach(doc => {
          anh.push({
            hinh: doc.data().hinh,
          });
          this.setState({
            avatarSource: anh,
          });
        });
      });
  }
  render() {
    return (
      <View>
        <Text style={styles.headerText}>Quản lý công tác phí </Text>
        <View>
          <FlatList
            style={styles.Proflie}
            data={this.state.avatarSource}
            renderItem={({item}) => (
              <View>
                <Image style={styles.Proflie} source={{uri: item.hinh}} />
              </View>
            )}
            keyExtractor={item => item.hinh}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Proflie: {
    // resizeMode: 'contain',
    flex: 1,
    width: 350,
    height: 500,
    alignItems: 'center',
    margin: 20,
  },
  headerText: {
    width: WIDTH - 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    lineHeight: 35,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#2D389C',
  },
  iconBack: {
    width: 30,
    height: 30,
  },
});
