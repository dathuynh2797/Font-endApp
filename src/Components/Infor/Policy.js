import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {firebaseApp} from '../../Components/config';

export class Policy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const abc = firebaseApp.firestore();
    abc.collection('policy').onSnapshot(querySnapshot => {
      var policy = [];
      querySnapshot.forEach(doc => {
        policy.push({
          id: doc.id,
          name: doc.data().policyName,
          image: doc.data().policyImg[0].publicUrl,
        });

        this.setState({
          data: policy,
        });
      });
    });
  }
  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={({item}) => (
          <SafeAreaView style={styles.MenuContainer}>
            <View style={styles.Col}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('detailPolicy', {
                    name: item.name,
                    image: item.image,
                  });
                }}>
                <View style={styles.TabMenu}>
                  <Text style={styles.Text}>{item.name}</Text>
                  <Text />
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  MenuContainer: {
    flex: 1,
    //justifyContent: 'center',
    //flexDirection: 'column',
    //alignItems: 'center',
    //backgroundColor: 'grey',
  },
  Col: {
    //flex: 1,
    //flexDirection: 'row',
    height: 70,
    margin: 1,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#1787AB',
    justifyContent: 'center',
  },
  TabMenu: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  Iconstyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    height: 50,
    width: 50,
    backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 1,
  },
  Icon: {
    height: 50,
    width: 50,
  },
  Text: {
    color: 'white',
    fontStyle: 'normal',
    fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 20,
    lineHeight: 23,
    alignSelf: 'center',
  },
  btnGo: {
    color: 'white',
    fontSize: 18,
  },
});
