import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {firebaseApp} from '../../Components/config';
export class ProjectNow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Project: [],
    };
  }

  onRefresh = () => {
    this.setState({loading: true}, () => this.getData());
  };

  getData = () => {
    const abc = firebaseApp.firestore();
    abc
      .collection('suppliers')
      .where('supplierStatus', '==', 'active')
      .onSnapshot(querySnapshot => {
        var name = [];
        querySnapshot.forEach(doc => {
          name.push({
            id: doc.id,
            ten: doc.data().supplierNames,
            gia: doc.data().soTien,
            vitri: doc.data().supplierLocation,
            hinhanh: doc.data().supplierProfile[0].publicUrl,
            hinhanhtq: doc.data().supplierProfile1[0].publicUrl,
            hinhanhpl: doc.data().supplierProfile2[0].publicUrl,
            hinhanhbg: doc.data().supplierProfile3[0].publicUrl,
            hinhanhnv: doc.data().supplierProfile4[0].publicUrl,
            hinhanhkh: doc.data().supplierProfile5[0].publicUrl,
            hinhanhqc: doc.data().supplierProfile6,
            latitude: doc.data().supplierLat,
            longtitude: doc.data().supplierLong,
          });

          this.setState({
            Project: name,
            loading: false,
          });
          // console.log(this.state.Project);
        });
      });
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <FlatList
        data={this.state.Project}
        refreshing={this.state.loading}
        onRefresh={() => this.onRefresh()}
        renderItem={({item}) => (
          <View style={styles.scene}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('DetailsProject', {
                  id: item.id,
                  ten: item.ten,
                  hinhanhtq: item.hinhanhtq,
                  hinhanhpl: item.hinhanhpl,
                  hinhanhbg: item.hinhanhbg,
                  hinhanhnv: item.hinhanhnv,
                  hinhanhkh: item.hinhanhkh,
                  hinhanhqc: item.hinhanhqc,
                  latitude: item.latitude,
                  longtitude: item.longtitude,
                });
              }}>
              <View style={styles.items}>
                <View style={styles.imgContent}>
                  <Image style={styles.image} source={{uri: item.hinhanh}} />
                </View>
                <View style={styles.dataContent}>
                  <View style={styles.titleContent}>
                    <Text style={styles.title}>{item.ten}</Text>
                  </View>
                  <View style={styles.locationContent}>
                    <Image
                      source={require('../../img/ProjectIcon/pin.png')}
                      style={styles.icon}
                    />
                    <Text style={styles.location}>{item.vitri}</Text>
                  </View>
                  <View style={styles.priceContent}>
                    <Image
                      source={require('../../img/ProjectIcon/payment.png')}
                      style={styles.icon}
                    />
                    <Text style={styles.price}>
                      {item.gia
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      VND
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
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
    height: 150,
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
    height: 140,
    width: 140,
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
    width: 25,
    height: 25,
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
