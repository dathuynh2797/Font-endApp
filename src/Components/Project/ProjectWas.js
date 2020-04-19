import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

export class ProjectWas extends Component {
  render() {
    return (
      <View style={styles.scene}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('DetailsWas');
          }}>
          <View style={styles.items}>
            <View style={styles.image} />
            <View style={styles.data}>
              <Text style={styles.title}>Title Was</Text>
              <Text style={styles.description}>Location</Text>
              <Text style={styles.price}>Price</Text>
            </View>
          </View>
        </TouchableOpacity>
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
    backgroundColor: '#000',
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
