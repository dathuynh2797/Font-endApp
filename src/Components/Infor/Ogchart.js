import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import {firebaseApp} from '../config';

export class Ogchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenphong: [],
      tennv: [],
      image: '',
    };
  }
  componentDidMount() {
    firebaseApp
      .firestore()
      .collection('brands')
      .onSnapshot(querySnapshot => {
        var image = '';
        querySnapshot.forEach(doc => {
          image = doc.data().brandCover[0].publicUrl;
        });
        this.setState({
          image: image,
        });
      });

    firebaseApp
      .firestore()
      .collection('units')
      .onSnapshot(querySnapshot => {
        var name = [];
        querySnapshot.forEach(doc => {
          name.push({
            ten: doc.data().unitsTitle,
            idP: doc.data().id,
          });
        });
        this.setState({
          tenphong: name,
        });
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.body}>
        <SafeAreaView style={styles.Imgview}>
          <View style={styles.Chart}>
            <Image source={{uri: this.state.image}} style={styles.Imgview1} />
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.MenuContainer}>
          <FlatList
            data={this.state.tenphong}
            renderItem={({item}) => (
              <View style={styles.Col}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Ogchartpns', {
                      ten: item.idP,
                    });
                  }}>
                  <View style={styles.TabMenu}>
                    <Text style={styles.Text}>{item.ten}</Text>
                    {/* <Text>{this.state.lengthbgd.length} nhân sự</Text> */}
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.ten}
          />
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  Imgview: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Imgview1: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  Chart: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 170,
    width: 329,
  },
  MenuContainer: {
    flex: 2 / 3,
  },
  Col: {
    height: 70,
    margin: 1,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#1787AB',
    justifyContent: 'center',
  },
  TabMenu: {
    flexWrap: 'wrap',
  },
  Iconstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    height: 50,
    width: 50,
    backgroundColor: 'white',
  },
  Icon: {
    height: 50,
    width: 50,
  },
  Text: {
    color: 'white',
    fontStyle: 'normal',
    // fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 20,
    lineHeight: 23,
    alignSelf: 'center',
  },
  btnGo: {
    //color: 'white',
    fontSize: 18,
  },
});
