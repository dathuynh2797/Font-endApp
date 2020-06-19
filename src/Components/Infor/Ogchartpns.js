import React, {Component} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {firebaseApp} from '../config';
import {HeaderLeft, HeaderRight, Title} from '../CustomHeader';
import 'firebase/firestore';

export class Ogchartpns extends Component {
  static navigationOptions = ({navigation}) => {
    const name = navigation.getParam('name', 'chưa có dữ liệu');
    return {
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerTitle: () => <Title title={name} />,
      headerRight: () => <HeaderRight navigation={navigation} />,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bgd: [],
      tennv: [],
    };
  }

  componentDidMount() {
    var name = [];
    const {navigation} = this.props;
    const idPhong = navigation.getParam('ten', 'chưa có dữ liệu');
    firebaseApp
      .firestore()
      .collection('user')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (idPhong === doc.data().productUnit) {
            name.push({
              ten1: doc.data().fullName,
              image: doc.data().avatars[0].publicUrl,
              chucvu: doc.data().roles[0],
              sdt: doc.data().phoneNumber,
            });
          }
        });
        this.setState({
          tennv: name,
        });
      });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.tennv}
          renderItem={({item}) => (
            <View style={styles.scene}>
              <View style={styles.items}>
                <View style={styles.imgContent}>
                  <Image style={styles.image} source={{uri: item.image}} />
                </View>
                <View style={styles.dataContent}>
                  <View style={styles.titleContent}>
                    <Text style={styles.title}>{item.ten1}</Text>
                  </View>
                  <View style={styles.locationContent}>
                    <Image
                      source={require('../../img/role.png')}
                      style={styles.icon}
                    />
                    <Text style={styles.location}>{item.chucvu}</Text>
                  </View>
                  <View style={styles.priceContent}>
                    <Image
                      source={require('../../img/phone.png')}
                      style={styles.icon}
                    />
                    <Text style={styles.price}>{item.sdt}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.sdt}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  items: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: 'rgb(255,255,255)',
    height: 110,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  imgContent: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
  dataContent: {width: '60%'},
  titleContent: {
    flex: 1 / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {fontSize: 20, fontWeight: 'bold'},
  icon: {
    marginHorizontal: 5,
    width: 20,
    // backgroundColor: 'red',
    height: 20,
  },
  locationContent: {
    flex: 1 / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {width: '80%', color: '#1273EB'},
  priceContent: {
    backgroundColor: 'white',
    flex: 1 / 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {color: '#ff0000'},
});
