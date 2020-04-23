import React from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';

function Title({title}) {
  return (
    <View style={styles.Title}>
      <Text style={styles.Text}>{title}</Text>
    </View>
  );
}

function HeaderRight({navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate({routeName: 'HomeScreen'})}>
      <Image source={require('../img/exit.png')} style={styles.IconExit} />
    </TouchableOpacity>
  );
}
function HeaderLeft({navigation}) {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={require('../img/back.png')} style={styles.IconBack} />
    </TouchableOpacity>
  );
}

function Header({title, navigation}) {
  return (
    <View style={styles.Header}>
      <TouchableOpacity style={styles.Left} onPress={() => navigation.goBack()}>
        <Image source={require('../img/back.png')} style={styles.IconBack} />
      </TouchableOpacity>
      <View style={styles.TitleH}>
        <Text style={styles.Text}>{title}</Text>
      </View>
      <TouchableOpacity
        style={styles.Right}
        onPress={() => navigation.navigate('HomeScreen')}>
        <Image source={require('../img/exit.png')} style={styles.IconExitH} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 0.5,
    marginBottom: 10,
    // backgroundColor: 'white',
  },
  Left: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    // borderColor: 'red',
  },
  Right: {
    flex: 1,
    // borderWidth: 1,
    justifyContent: 'center',
    // borderColor: 'red',
  },
  Title: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleH: {
    flex: 3,
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    // paddingLeft: 10,
    fontWeight: '700',
    fontSize: 20,
  },
  IconBack: {
    marginLeft: 10,
    height: 20,
    width: 20,
  },
  IconExit: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
  IconExitH: {
    marginLeft: 50,
    height: 20,
    width: 20,
  },
});

export {Title};
export {HeaderRight};
export {HeaderLeft};
export {Header};
