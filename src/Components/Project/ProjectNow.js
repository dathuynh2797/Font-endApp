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

  componentDidMount() {
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
            gia: doc.data().cost,
            vitri: doc.data().supplierLocation,
            hinhanh: doc.data().image,
            hinhanhtq: doc.data().imagetq,
          });

          this.setState({
            Project: name,
            loading: false,
          });
        });
      });
  }
  render() {
    return (
      <FlatList
        data={this.state.Project}
        renderItem={({item}) => (
          <View style={styles.scene}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('DetailsNow', {
                  id: item.id,
                  ten: item.ten,
                  hinhanhtq: item.hinhanhtq,
                });
              }}>
              <View style={styles.items}>
                <Text />
                <View style={styles.image}>
                  <Image style={styles.image} source={{uri: item.hinhanh}} />
                </View>
                <View style={styles.data}>
                  <View>
                    <Text style={styles.title}>{item.ten}</Text>
                    <Text style={styles.description}>{item.vitri}</Text>
                    <Text style={styles.price}>{item.gia}</Text>
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 3,
  },
  image: {
    height: 100,
    width: 100,
  },
  data: {
    paddingHorizontal: 10,
    marginTop: 5,
    marginLeft: 15,
  },
  title: {
    color: '#444',
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    color: '#888',
    fontWeight: '300',
  },
  price: {
    fontSize: 16,
    color: '#ff0000',
    fontWeight: '300',
  },
});
